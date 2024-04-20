import { Box } from "@chakra-ui/react";

function PageBase({ children }: { children: React.ReactNode }) {
    return (
        <Box w="full" h="full" p={4}>
            {children}
        </Box>
    );
}

export default PageBase;