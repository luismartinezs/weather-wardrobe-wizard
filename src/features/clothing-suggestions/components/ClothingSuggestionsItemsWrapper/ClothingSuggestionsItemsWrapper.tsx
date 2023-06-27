import { baseTheme, Flex, Grid, List } from "@chakra-ui/react";
import { ViewMode } from "@/features/clothing-suggestions/types";
import { viewMode } from "@/features/clothing-suggestions/constants";

const ClothingSuggestionsItemsWrapper = ({
  mode = viewMode.list,
  children,
}: {
  mode: ViewMode;
  children: React.ReactNode;
}): JSX.Element => {
  if (mode === viewMode.flex) {
    return (
      <Flex
        mt={2}
        gap={2}
        flexWrap="nowrap"
        overflowX="auto"
        pb={2}
        sx={{
          "::-webkit-scrollbar": {
            height: "8px",
            borderRadius: "8px",
            backgroundColor: baseTheme.colors.gray[700],
          },
          "::-webkit-scrollbar-track": {
            height: "8px",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: baseTheme.colors.gray[600],
            height: "8px",
            borderRadius: "8px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            backgroundColor: baseTheme.colors.gray[500],
          },
          "::-webkit-scrollbar-thumb:active": {
            backgroundColor: baseTheme.colors.gray[400],
          },
          scrollbarWidth: "auto",
          scrollbarColor: `${baseTheme.colors.gray[600]} ${baseTheme.colors.gray[700]}`,
        }}
        data-testid="clothing-suggestions"
      >
        {children}
      </Flex>
    );
  }

  if (mode === viewMode.grid) {
    return (
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={2}
        mt={2}
        pb={2}
        data-testid="clothing-suggestions"
      >
        {children}
      </Grid>
    );
  }
  return (
    <List spacing={1.5} mt={2} pb={2} data-testid="clothing-suggestions">
      {children}
    </List>
  );
};

export default ClothingSuggestionsItemsWrapper;
