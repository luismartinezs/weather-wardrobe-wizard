import { LocationSuggestion } from "@/types/weatherApi";

const mockLocations = [
  {
    id: "1",
    name: "London",
    country: "United Kingdom",
    lat: 51.5085,
    lon: -0.1257,
    state: "England",
  },
  {
    id: "2",
    name: "New York",
    country: "United States",
    lat: 40.7143,
    lon: -74.006,
    state: "New York",
  },
];

export const useRecentLocations = (): {
  recentLocations: LocationSuggestion[];
  id: string;
} => {
  return {
    recentLocations: mockLocations, //[],
    id: "",
  };
};
