import { viewMode } from "@/features/clothing-suggestions/constants";
import { ClothingId } from "@/features/clothing-suggestions/utils/clothingMap";

export type ViewMode = keyof typeof viewMode;
export type ClothingItem = {
  label: string;
  url: string;
  imageUrl: string;
  id: ClothingId;
};
