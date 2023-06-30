import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const PlanFeatures = ({ features }: { features: string[] }): JSX.Element => {
  return (
    <List spacing={4}>
      {features.map((feature, index) => (
        <ListItem key={index}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {feature}
        </ListItem>
      ))}
    </List>
  );
};

export default PlanFeatures;
