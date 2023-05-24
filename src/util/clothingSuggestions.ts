import { areArraysOverlapping, between } from '@/util/util';
import { WeatherForecast } from '@/util/weather';

export type ClothingSuggestion = {
  label: string;
  imageUrl: string;
  url: string;
}

export const clothingMap: { [index: string]: ClothingSuggestion } = {
  "tShirt": { label: "T-shirt", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218724/weather-wardrobe-wizard/saito200_A_high-quality_eye-catching_product_photo_featuring_a__ce73d608-106b-44a3-b188-3c80412e030a_atr9mv.png", url: "https://www.amazon.com/s?k=t-shirt&i=apparel&ref=nb_sb_noss_2" },
  "shorts": { label: "Shorts", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218414/weather-wardrobe-wizard/saito200_An_appealing_product_photograph_showcasing_a_stylish_p_6863fa13-dd75-48fa-9de4-d2a603b15dd8_afd3sy.png", url: "https://www.amazon.com/s?k=shorts&i=apparel&ref=nb_sb_noss_2" },
  "jeans": { label: "Jeans", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679216035/weather-wardrobe-wizard/saito200_jeans_d5113a74-a8f5-4397-8548-b4c4800ed702_nwctcn.png", url: "https://www.amazon.com/s?k=jeans&i=apparel&ref=nb_sb_noss_2" },
  "warmPants": { label: "Warm pants", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679217480/weather-wardrobe-wizard/saito200_warm_pants_b2d02496-1fca-4aee-9a0e-8147ebd48ac0_lgt8ti.png", url: "https://www.amazon.com/s?k=warm+pants&i=apparel&ref=nb_sb_noss_2" },
  "sweater": { label: "Sweater", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679217418/weather-wardrobe-wizard/saito200_A_striking_product_photo_of_an_elegant_sweater_showcas_bb002392-c632-4d14-82ff-09b4826d3f92_ekt3zo.png", url: "https://www.amazon.com/s?k=sweater&i=apparel&ref=nb_sb_noss_2" },
  "jacket": { label: "Jacket", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218809/weather-wardrobe-wizard/saito200_An_attractive_product_photograph_featuring_a_versatile_69b04076-13bf-4d7a-aff7-f186eb81c884_teiiwy.png", url: "https://www.amazon.com/s?k=jacket&i=apparel&ref=nb_sb_noss_2" },
  "beanie": { label: "Beanie", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679216916/weather-wardrobe-wizard/photo-1640558379024-133af932fa1c_vslnzz.avif", url: "https://www.amazon.com/s?k=beanie&i=apparel&ref=nb_sb_noss_2" },
  "gloves": { label: "Gloves", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679216949/weather-wardrobe-wizard/photo-1549396555-3d107fd70c85_nfndbi.avif", url: "https://www.amazon.com/s?k=gloves&i=apparel&ref=nb_sb_noss_2" },
  "scarf": { label: "Scarf", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218243/weather-wardrobe-wizard/saito200_An_enticing_product_image_displaying_a_luxurious_scarf_1727f29a-b00f-49d0-83aa-39159c1db0d0_d7ykn2.png", url: "https://www.amazon.com/s?k=scarf&i=apparel&ref=nb_sb_noss_2" },
  "leggings": { label: "Leggings", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218498/weather-wardrobe-wizard/saito200_A_visually_appealing_product_photograph_featuring_fash_fe339a32-cb19-481b-8f47-9ffe34c4912c_eri5fo.png", url: "https://www.amazon.com/s?k=leggings&i=apparel&ref=nb_sb_noss_2" },
  "fleeceSweater": { label: "Fleece sweater", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218231/weather-wardrobe-wizard/saito200_A_captivating_product_image_of_a_cozy_fleece_sweater_e_3514149b-155a-4ebc-91eb-b9df0e1375d8_jmnxfs.png", url: "https://www.amazon.com/s?k=fleece+sweater&i=apparel&ref=nb_sb_noss_2" },
  "monkeyCap": { label: "Monkey Cap", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679217148/weather-wardrobe-wizard/ladies-monkey-cap-1000x1000_fznxti.webp", url: "https://www.amazon.com/s?k=monkey+cap&i=apparel&ref=nb_sb_noss_2" },
  "thinGloves": { label: "Thin Gloves", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679217209/weather-wardrobe-wizard/3b496ea3-9dd8-4ef4-8ae6-07a9ced8bfee.333f4cec9831ae18d2ef8129b5930a57_dh6b5s.jpg", url: "https://www.amazon.com/s?k=thin+gloves&i=apparel&ref=nb_sb_noss_2" },
  "thickGloves": { label: "Thick Gloves", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218224/weather-wardrobe-wizard/saito200_A_striking_product_image_showcasing_a_pair_of_thick_gl_168134f0-fbe8-4ffa-9d6f-552dd1ef6a3c_g397wq.png", url: "https://www.amazon.com/s?k=thick+gloves&i=apparel&ref=nb_sb_noss_2" },
  "fleecePants": { label: "Fleece pants", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679217542/weather-wardrobe-wizard/saito200_An_attractive_product_photo_featuring_a_pair_of_comfor_26e62bdf-e4ac-42ea-a888-8db5111301a2_ti0geo.png", url: "https://www.amazon.com/s?k=fleece+pants&i=apparel&ref=nb_sb_noss_2" },
  "thermalUnderwear": { label: "Thermal underwear", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218075/weather-wardrobe-wizard/41vokZ7PeYL._AC_SX425__n4v0wg.jpg", url: "https://www.amazon.com/s?k=thermal+underwear&i=apparel&ref=nb_sb_noss_2" },
  "thermalSocks": { label: "Thermal socks", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218115/weather-wardrobe-wizard/saito200_A_captivating_product_photograph_showcasing_a_pair_of__867f3ddb-6e3b-4c01-bd71-ddb3346ac799_zbhxq5.png", url: "https://www.amazon.com/s?k=thermal+socks&i=apparel&ref=nb_sb_noss_2" },
  "raincoat": { label: "Raincoat", imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679218108/weather-wardrobe-wizard/saito200_A_striking_product_photo_of_a_practical_raincoat_highl_bfdd86c7-c9c1-4f39-ac06-7f332d872027_cjm6w6.png", url: "https://www.amazon.com/s?k=raincoat&i=apparel&ref=nb_sb_noss_2" },
  "waterProofShoes": {
    label: "Waterproof shoes",
    imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679223144/weather-wardrobe-wizard/saito200_A_compelling_product_photo_featuring_a_pair_of_waterpr_60b2a044-f698-49af-b008-09f8a7bfb516_ub8gd8.png",
    url: "https://www.amazon.com/s?k=waterproof+shoes&i=apparel&ref=nb_sb_noss_2"
  },
  "snowBoots": {
    label: "Snow boots",
    imageUrl: "https://res.cloudinary.com/dicyllvry/image/upload/v1679223339/weather-wardrobe-wizard/0_3_lowg7j.png",
    url: "https://www.amazon.com/s?k=snow+boots&i=apparel&ref=nb_sb_noss_2"
  }
}

function getClothingForTemperature(minT: number, maxT: number): string[] {
  const layers = [];

  layers.push("tShirt");

  if (minT > 25) {
    layers.push("shorts");
  }
  if (between(minT, 13, 25)) {
    layers.push("jeans");
  }
  if (minT <= 13) {
    layers.push("warmPants");
  }
  if (between(minT, 13, 20)) {
    layers.push("sweater");
  }
  if (between(minT, 7, 13)) {
    layers.push("jacket");
  }
  if (between(minT, 0, 7)) {
    layers.push("gloves");
  }
  if (minT <= 0) {
    layers.push("thinGloves", "thickGloves");
  }
  if (between(minT, -10, 7)) {
    layers.push("sweater", "jacket", "beanie", "scarf", "leggings");
  }
  if (minT <= -10) {
    layers.push("fleeceSweater", "jacket", "monkeyCap", "scarf", "fleecePants", "thermalUnderwear", "fleecePants", "thermalSocks");
  }

  if (maxT > 25) {
    layers.push('shorts')
  }

  return [...new Set(layers)];
}

function getClothingForWeather(weatherTypes: string[]): string[] {
  const clothing = []

  if (areArraysOverlapping(weatherTypes, ['Rain', 'Thunderstorm', 'Drizzle'])) {
    clothing.push("raincoat");
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
    clothing.push("sunglasses");
  }

  return clothing;
}

export type ClothingId = keyof typeof clothingMap;
export type ClothingSuggestionWithId = ClothingSuggestion & { id: ClothingId }

export const getClothingSuggestions = (forecast: WeatherForecast[] | null): ClothingSuggestionWithId[] | null => {
  if (!forecast) {
    return null
  }
  const { minTemp, maxTemp, weatherTypes } = forecast.reduce((acc, day) => {
    return {
      minTemp: Math.min(acc.minTemp, day.minTemp),
      maxTemp: Math.max(acc.maxTemp, day.maxTemp),
      weatherTypes: new Set([...acc.weatherTypes, day.weatherType])
    }
  }, {
    minTemp: Number.MAX_VALUE,
    maxTemp: Number.MIN_VALUE,
    weatherTypes: new Set<string>()
  });

  return [...getClothingForTemperature(minTemp, maxTemp), ...getClothingForWeather([...weatherTypes])].sort().filter(id => id in clothingMap).map(id => {
    return { id: id as keyof typeof clothingMap, ...clothingMap[id as keyof typeof clothingMap] }
  });
};