import { IconButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid3X3Gap } from "react-icons/bs";

import { ViewMode } from "@/features/clothing-suggestions/types";

type Props = {
  mode: ViewMode;
  onClick: () => void;
};

const ClothingViewButton = ({ mode, onClick }: Props): JSX.Element => {
  return mode === "list" ? (
    <IconButton
      variant="outline"
      aria-label="Switch to grid view"
      icon={<Icon as={BsGrid3X3Gap} />}
      onClick={onClick}
    />
  ) : (
    <IconButton
      variant="outline"
      aria-label="Switch to list view"
      icon={<Icon as={AiOutlineUnorderedList} />}
      onClick={onClick}
    />
  );
};

export default ClothingViewButton;
