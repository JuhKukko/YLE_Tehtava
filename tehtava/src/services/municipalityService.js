import { parseCSV } from '../utils/csvParser';

export const fetchData = async () => {

    try {
        const response = await fetch('public/data.csv');      
        const text = await response.text();
        const data = parseCSV(text);
        return data;            
    } catch (error) {
        console.error("Virhe CSV-tiedoston luvussad: ", error);
        return [];
    }    
}
