import { baseTheme, Flex } from "@chakra-ui/react";
import { ViewMode } from "@/features/clothing-suggestions/types";

const ClothingSuggestionsItemsWrapper = ({
  mode,
  children,
}: {
  mode: ViewMode;
  children: React.ReactNode;
}): JSX.Element => {
  if (mode === "flex") {
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

  if (mode === "grid") {
    return (
      <Flex
        mt={2}
        flexWrap="wrap"
        gap={2}
        pb={2}
        data-testid="clothing-suggestions"
      >
        {children}
      </Flex>
    );
  }
  return <></>;
};

export default ClothingSuggestionsItemsWrapper;
