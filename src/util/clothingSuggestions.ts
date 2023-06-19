import { areArraysOverlapping, between, dedupeArray } from '@/util/util';
import { WeatherForecast } from '@/util/weather';
import { clothingMap } from '@/util/clothingMap';

export type ClothingSuggestion = {
  label: string;
  imageUrl: string;
  url: string;
}

function getClothingForTemperature(minT: number, maxT: number): string[] {
  console.debug(`Getting clothing for temperature range ${minT} - ${maxT}`);
  const layers = [];

  // Very hot: over 25 degrees
  if (maxT > 25) {
    layers.push('lightBreathableDress', 'linenShorts', 'lightLinenShirt');
  }

  // Hot: 20 - 25 degrees
  if (maxT > 20 && maxT <= 25) {
    layers.push('shorts', 'tshirt');
  }

  // Mild to warm: 13 - 25 degrees
  if (minT > 13 && minT <= 25) {
    layers.push('jeans', 'lightJeans', 'longSleevedShirt');
  }

  // Cool to mild: 13 - 20 degrees
  if (minT > 13 && minT <= 20) {
    layers.push('lightSweater', 'lightJacket');
  }

  // Chilly: 7 - 13 degrees
  if (minT > 7 && minT <= 13) {
    layers.push('warmPants', 'heavyJeans', 'thickSweater');
  }

  // Cold: 0 - 7 degrees
  if (minT > 0 && minT <= 7) {
    layers.push('jacket', 'heavyJacket', 'neckWarmer', 'thinGloves');
  }

  // Very cold: below 0 degrees
  if (minT <= 0) {
    layers.push('thickGloves', 'earMuffs', 'insulatedBoots');
  }

  // Extremely cold: below -10 degrees
  if (minT <= -10) {
    layers.push('fleeceSweater', 'jacket', 'monkeyCap', 'scarf', 'fleecePants', 'thermalUnderwear', 'thermalSocks');
  }

  // Ensure we don't duplicate any layers and return the array
  return [...new Set(layers)];
}


function getClothingForWeather(weatherTypes: string[]): string[] {
  const clothing = []

  if (areArraysOverlapping(weatherTypes, ['Rain', 'Thunderstorm', 'Drizzle'])) {
    clothing.push("raincoat", "umbrella", "waterproofPants", "waterproofJacket");
  }
  if (weatherTypes.includes("Rain") && !weatherTypes.includes("Snow")) {
    clothing.push("waterProofShoes");
  }
  if (weatherTypes.includes("Snow")) {
    clothing.push("snowBoots");
  }
  if (
    areArraysOverlapping(weatherTypes, ['Smoke',
      'Dust', 'Sand', 'Ash'
    ])
  ) {
    clothing.push("faceMask");
  }
  if (weatherTypes.includes("Clear")) {
    clothing.push("sunglasses", "sunHat", "sunscreen");
  }

  return clothing;
}

function getClothingForWind(windSpeed: number): string[] {
  const clothing = []

  if (windSpeed > 5) {
    clothing.push("windbreaker");
  }

  return clothing;
}

function getClothingForHumidity(maxHumidity: number): string[] {
  const clothing = [];

  if (maxHumidity > 75) {
    clothing.push("lightBreathableDress", "lightLinenShirt", "linenShorts");
  }

  else if (maxHumidity > 35) {
    clothing.push("longSleevedShirt", "jeans");
  }

  else {
    clothing.push("chapstick", "heavyJacket", "thickSweater");
  }

  return clothing;
}


function getMinimalClothingForTemperature(minT: number, maxT: number): string[] {
  console.debug(`Getting clothing for temperature range ${minT} - ${maxT}`);
  const layers = [];

  layers.push('tShirt')

  if (maxT > 25) {
    layers.push('shorts');
  }

  if (minT < 25) {
    layers.push('jeans');
  }

  if (between(minT, 18, 13) || minT < 7) {
    layers.push('sweater');
  }

  if (minT < 13) {
    layers.push('jacket');
  }

  if (minT < 7) {
    layers.push('gloves', 'monkeyCap', 'scarf', 'leggings');
  }

  return [...new Set(layers)];
}

function getMinimalClothingForWeather(weatherTypes: string[]): string[] {
  const clothing = []

  if (weatherTypes.includes("Snow")) {
    clothing.push("snowBoots");
  }
  if (weatherTypes.includes("Clear")) {
    clothing.push("sunglasses");
  }
  if (weatherTypes.includes("Rain") && !weatherTypes.includes("Snow")) {
    clothing.push("waterProofShoes");
  }
  if (
    areArraysOverlapping(weatherTypes, ['Smoke',
      'Dust', 'Sand', 'Ash'
    ])
  ) {
    clothing.push("faceMask");
  }

  if (areArraysOverlapping(weatherTypes, ['Rain', 'Thunderstorm', 'Drizzle'])) {
    clothing.push("raincoat");
  }

  return clothing;
}

function getMinimalClothingForWind(windSpeed: number): string[] {
  const clothing = []

  if (windSpeed > 7) {
    clothing.push("windbreaker");
  }

  return clothing;
}

export type ClothingId = keyof typeof clothingMap;
export type ClothingSuggestionWithId = ClothingSuggestion & { id: ClothingId }

function handleClothingIds(clothingIds: ClothingId[]) {
  return dedupeArray(clothingIds)
    .sort()
    .filter(id => id in clothingMap)
    .map(id => {
      return {
        id: id as keyof typeof clothingMap,
        ...clothingMap[id as keyof typeof clothingMap]
      }
    });
}

function reduceForecast(forecast: WeatherForecast[]) {
  return forecast.reduce((acc, day) => {
    return {
      minTemp: Math.min(acc.minTemp, day.minTemp),
      maxTemp: Math.max(acc.maxTemp, day.maxTemp),
      weatherTypes: new Set([...acc.weatherTypes, day.weatherType]),
      maxWindSpeed: Math.max(acc.maxWindSpeed, day.maxWindSpeed),
      maxHumidity: Math.max(acc.maxHumidity, day.maxHumidity)
    }
  }, {
    minTemp: Number.MAX_VALUE,
    maxTemp: Number.MIN_VALUE,
    weatherTypes: new Set<string>(),
    maxWindSpeed: Number.MIN_VALUE,
    maxHumidity: Number.MIN_VALUE
  });
}

export const getFullClothingSuggestions = (forecast: WeatherForecast[] | null): ClothingSuggestionWithId[] | null => {
  if (!forecast) {
    return null
  }
  const { minTemp, maxTemp, weatherTypes, maxWindSpeed, maxHumidity } = reduceForecast(forecast)

  return handleClothingIds([
    ...getClothingForTemperature(minTemp, maxTemp),
    ...getClothingForWeather([...weatherTypes]),
    ...getClothingForWind(maxWindSpeed),
    ...getClothingForHumidity(maxHumidity)
  ])
};

export const getMinimalClothingSuggestions = (forecast: WeatherForecast[] | null) => {
  if (!forecast) {
    return null
  }
  const { minTemp, maxTemp, weatherTypes, maxWindSpeed } = reduceForecast(forecast)

  return handleClothingIds([
    ...getMinimalClothingForTemperature(minTemp, maxTemp),
    ...getMinimalClothingForWeather([...weatherTypes]),
    ...getMinimalClothingForWind(maxWindSpeed),
  ])
}

export const getClothingSuggestions = (forecast: WeatherForecast[] | null) => {
  return getMinimalClothingSuggestions(forecast)
}