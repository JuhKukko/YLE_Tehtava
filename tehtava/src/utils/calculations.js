export const calculateForeignSpeakingPercentage = (municipalityData) => {
    if(!municipalityData) return 0;
    let result = municipalityData.Vieraskieliset / municipalityData.Varhaiskasvatus * 100;
    return Math.round(result * 10) / 10;        
};
