import "@radix-ui/themes/styles.css";

import { 
  Flex, Text, Container, 
  Box 
} from "@radix-ui/themes";

const Header = () => (
  <Box py="4" style={{ borderBottom: "1px solid var(--gray-5)" }}>
    <Container size="3">
      <Flex justify="between" align="center">
        <Flex gap="3" align="center">
        </Flex>
        <Flex gap="4" align="center" display={{ initial: "none", sm: "flex" }}>
          <Text size="2" color="gray">Juhani Kukko 8.12.2025</Text>          
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Header;