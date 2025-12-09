import { useEffect, useState } from 'react'

import { fetchData } from './services/municipalityService';
import { calculateForeignSpeakingPercentage } from './utils/calculations';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import MunicipalityInfo from './components/MunicipalityInfo';
import MunicipalityDropdown from './components/MunicipalityDropdown';
import MunicipalityChart from './components/MunicipalityChart';

import "@radix-ui/themes/styles.css";
import { 
  Theme, Flex, Text, Container, Section, Heading, 
  Select, Card, Separator, Grid, Box
} from "@radix-ui/themes";
import './App.css'

function App() {

  const [selectedMunicipality, setSelectedMunicipality] = useState(null)
  const [municipalitySelectionList, setMunicipalitySelectionList] = useState([])
  const [csvData, setCsvData] = useState([]); 
  
  const handleSelect = (koodi) => {
    const selectedMunicipality = csvData.find(rivi => rivi.Koodi === koodi);
    setSelectedMunicipality(selectedMunicipality);    
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData(); 
      setCsvData(data);      
      const list = data.map(row => ({
        koodi: row.Koodi,
        nimi: row.Kunta
      })).sort((a, b) => a.nimi.localeCompare(b.nimi));      
      setMunicipalitySelectionList(list);
    }   
    loadData();    
  }, []);

  return (
    <Theme accentColor="indigo" grayColor="slate" radius="large" scaling="95%">
      <div style={{ background: "var(--gray-1)", minHeight: "100vh" }}>
        
        <Header />

        <Container size="3" py="8">
          <Grid columns={{ initial: "1", md: "3" }} gap="8">
            <Box style={{ gridColumn: "span 2" }}>
              
              <SubHeader/>

              <Card size="3" variant="surface" style={{ margin: "30px 0", background: "var(--color-background)" }}>
                <Flex direction="column" gap="4">
                  
                  <MunicipalityDropdown 
                    municipalitySelectionList={municipalitySelectionList}
                    handleSelect={handleSelect}
                  />

                  <Separator size="4" />

                  <MunicipalityInfo 
                    selectedMunicipality={selectedMunicipality}
                    calculatePercentage={calculateForeignSpeakingPercentage}
                  />

                  <Box style={{ marginTop: "10px", background: "var(--gray-2)", borderRadius: "var(--radius-3)", padding: "10px" }}>                    
                  
                    <Section>
                      <MunicipalityChart 
                        municipalitiesToBeShown={["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku"]}
                        csvData={csvData} 
                        selectedMunicipality={selectedMunicipality} 
                        calculatePercentage={calculateForeignSpeakingPercentage}>
                      </MunicipalityChart>
                    </Section>
                    
                    <Text size="1" color="gray" align="center" mt="2">
                      Vertailussa mukana suurimmat kaupungit sekä valitsemasi kunta.
                    </Text>
                  </Box>
                  
                  <Text size="1" color="gray">Lähde: Tilastokeskus.</Text>
                </Flex>
              </Card>
            </Box>
          </Grid>
        </Container>
            
    </div>
    </Theme>
  )
}

export default App
