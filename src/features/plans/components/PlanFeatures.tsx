import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { MdCheckCircle } from "react-icons/md";

const PlanFeatures = ({ features }: { features: string[] }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <List spacing={4}>
      {features.map((feature, index) => (
        <ListItem key={index}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {t(feature)}
        </ListItem>
      ))}
    </List>
  );
};

export default PlanFeatures;
