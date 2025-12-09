import "@radix-ui/themes/styles.css";

import { 
  Flex, Select, Text, Heading, Box 
} from "@radix-ui/themes";

import { BarChartIcon } from "@radix-ui/react-icons";

const MunicipalityDropdown = ( {municipalitySelectionList, handleSelect} ) => {
    return (
        <Flex justify="between" align="center" wrap="wrap" gap="3">
            <Flex align="center" gap="2">
                <BarChartIcon width="20" height="20" color="var(--accent-9)" />
                <Heading size="4">Tarkastele oman kuntasi tilannetta</Heading>
            </Flex>
            
            <Select.Root defaultValue="" onValueChange={(value) => handleSelect(value)}>
                <Select.Trigger placeholder="Valitse kunta..." style={{ minWidth: "200px" }} />
                <Select.Content position="popper" sideOffset={5}>
                <Select.Group>
                    <Select.Label>Kunnat</Select.Label>
                    {municipalitySelectionList.map((k) => (
                    <Select.Item key={k.koodi} value={k.koodi}>{k.nimi}</Select.Item>
                    ))}
                </Select.Group>
                </Select.Content>
            </Select.Root>
        </Flex>
    );
}

export default MunicipalityDropdown;