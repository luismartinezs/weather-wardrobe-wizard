import { Badge } from "@chakra-ui/react";

const PlanPill = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Badge colorScheme="secondary" px={2} py={1} borderRadius="8px">
      {children}
    </Badge>
  );
};

export default PlanPill;
