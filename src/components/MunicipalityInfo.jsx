import "@radix-ui/themes/styles.css";

import { 
  Flex, Text, Heading, Box 
} from "@radix-ui/themes";

const MunicipalityInfo = ( {selectedMunicipality, calculatePercentage} ) => {

return (
        selectedMunicipality ? (
            <Flex gap="5" wrap="wrap">
                <Box>
                    <Text size="1" color="gray" weight="bold" style={{ textTransform: "uppercase" }}>Kunta</Text>
                    <Heading size="6">{selectedMunicipality.Kunta}</Heading>
                 </Box>
                <Box>
                    <Text size="1" color="gray" weight="bold" style={{ textTransform: "uppercase" }}>Vieraskielisten osuus</Text>
                    <Heading size="8" color="indigo">{calculatePercentage(selectedMunicipality).toLocaleString('fi-FI')} %</Heading>
                </Box>
                <Box>
                    {selectedMunicipality.Vieraskieliset <= 10 ? (                        
                        <>                        
                           { /* Yksityisyydensuojan vuoksi vieraskielisten lukumäärää ei näytetä, kun se on kymmenen tai alle. */ }                        
                        </>
                    ) : (                        
                        <>
                            <Text size="1" color="gray" weight="bold" style={{ textTransform: "uppercase" }}>Lukumäärä</Text>
                            <Text as="div" size="3">{selectedMunicipality.Vieraskieliset} {selectedMunicipality.Vieraskieliset == 1 ? "vieraskielinen" : "vieraskielistä"} {selectedMunicipality.Varhaiskasvatus} lapsesta</Text>
                        </>
                    )}                    
                </Box>
            </Flex>
        ) : (
        <Text color="gray" align="center" py="4">Valitse kunta valikosta nähdäksesi tiedot.</Text>
        )    
)};

export default MunicipalityInfo;