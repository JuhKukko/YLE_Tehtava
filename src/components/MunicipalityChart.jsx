import { useRef, useEffect } from 'react'
import * as d3 from "d3"
                  
const MunicipalityChart = ( { municipalitiesToBeShown, csvData, selectedMunicipality, calculatePercentage } ) => {

    const svgRef = useRef();

    useEffect(() => {
        if(csvData.length > 0) {
            visualizeData();
        }
    }, [csvData, selectedMunicipality]);
    
    const visualizeData = () => {
    
        const municipalities = municipalitiesToBeShown; // ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku"];
        const municipalitiesData = [];
        municipalities.forEach((municipality, index) => {
            const municipalityData = csvData.find(rivi => rivi.Koodi === municipality);
            municipalitiesData.push(municipalityData);  
        });
    
        if(selectedMunicipality) {
            municipalities.push(`${selectedMunicipality.Kunta}`);      
            municipalitiesData.push(selectedMunicipality);
        }

        const parentWidth = svgRef.current?.parentElement?.clientWidth || 300;
        const width = parentWidth - 20;
        const height = 300;
        const margin = {top: 20, left: 20, bottom: 20, right: 20};
        const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)
        .style("overflow", "visible")
        .style("font-family", "var(--default-font-family)");

        svg.selectAll("*").remove();

        // x-akseli
        const x = d3.scaleBand()
        .domain(municipalities)
        .range([margin.left, width - margin.right])
        .padding(0.3);

        // y-akseli
        const y = d3.scaleLinear()
        .domain([0, Math.max(20, d3.max(municipalitiesData, d => calculatePercentage(d)) * 1.2)])
        .range([height - margin.bottom, margin.top]);
        
        // Taustaviivat
        const yAxisGrid = d3.axisLeft(y).tickSize(-width + margin.right + margin.left)
        .tickFormat("").ticks(5);

        svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxisGrid)
        .call(g => g.select(".domain").remove()) // Poistetaan pystyviiva
        .call(g => g.selectAll(".tick line") 
            .attr("stroke", "var(--gray-5)") // Radix harmaa
            .attr("stroke-dasharray", "4.4") // Katkoviiva
        );

        // Palkit
        svg.append('g')
        .selectAll("rect")
        .data(municipalitiesData)
        .join("rect")
        .attr("x", d => x(d.Kunta))
        .attr("y", d => y(calculatePercentage(d)))
        .attr("height", d => y(0) - y(calculatePercentage(d)))
        .attr("width", d => x.bandwidth())
        .attr("fill", d => d.Kunta === selectedMunicipality?.Kunta ? "var(--accent-9)" : "var(--gray-5)") // Radix värit valitulle ja ei valituille kunnille
        .attr("rx", 6) // Pyöristetyt kulmat
        .style("transition", "all 0.3s ease"); // datan muuttuessa lyhyt animointi  

        // x-akseli
        svg.append("g")
        .attr("transform", `translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom(x).tickSize(0))
        .call(g => g.select(".domain").remove()) // Poistetaan alaviiva
        .selectAll("text")
            .attr("transform", "translate(0,10)")
            .attr("fill", "var(--gray-11)")
            .style("font-size", "13px")
            .style("font-weight", "500");

        // y-akseli (vain tekstir, viivat on gridissä yAxisGrid)    
        svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(5).tickSize(0))
        .call(g => g.select(".domain").remove())
        .selectAll("text")
            .attr("fill", "var(--gray-10)")
            .style("font-size", "12px");  

        // arvot palkkien päälle      
        svg.append("g")
        .selectAll("text")  
        .data(municipalitiesData)
        .join("text")
            .text(d => calculatePercentage(d) + "%")
            .attr("x", d => x(d.Kunta) + x.bandwidth() / 2)
            .attr("y", d => y(calculatePercentage(d)) - 10)
            .attr("text-anchor", "middle")
            .attr("fill", d => d.Kunta === selectedMunicipality?.Kunta ? "var(--accent-11)" :  "var(--gray-11)")
            .attr("font-weight", "bold")
            .attr("font-size", "14px");                    
    }
    
    return <svg ref={svgRef}></svg>;    
}

export default MunicipalityChart;