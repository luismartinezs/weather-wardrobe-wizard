import { areArraysOverlapping, between, dedupeArray } from '@/util/util';
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
  },
  "lightLinenShirt": { "label": "Light Linen Shirt", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099763/weather-wardrobe-wizard/saito200_An_appealing_photo_of_a_light_linen_shirt_showcasing_i_58a08c25-f695-4d8c-a844-743ea4301e74_x00fwz.png", "url": "" },
  "linenShorts": { "label": "Linen Shorts", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687100148/weather-wardrobe-wizard/saito200_A_product_photo_of_a_pair_of_linen_shorts_perfect_for__6f010d94-ac73-45bf-9766-48653e198799_gchrqb.png", "url": "" },
  "sunHat": { "label": "Sun Hat", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099790/weather-wardrobe-wizard/saito200_An_attractive_product_photo_of_a_sun_hat_emphasizing_i_2ee5233a-563e-4a50-8042-1a3e1217fd85_tauvod.png", "url": "" },
  "lightJeans": { "label": "Light Jeans", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687098956/weather-wardrobe-wizard/saito200_A_chic_product_photo_of_a_pair_of_light_jeans_emphasiz_f7d26e4d-614c-4dd4-b87b-d9714c156120_hth3f5.png", "url": "" },
  "heavyJeans": { "label": "Heavy Jeans", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099798/weather-wardrobe-wizard/saito200_A_product_photo_of_a_pair_of_heavy_jeans_perfect_for_c_2c58e94e-31e6-42d7-a072-5113ac163c08_fcied3.png", "url": "" },
  "longSleevedShirt": { "label": "Long-Sleeved Shirt", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099753/weather-wardrobe-wizard/saito200_A_stylish_photo_of_a_long-sleeved_shirt_emphasizing_it_b18bfa55-9dc9-404e-86c6-630ec93b7d78_zqich3.png", "url": "" },
  "lightJacket": { "label": "Light Jacket", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099748/weather-wardrobe-wizard/saito200_A_product_photo_of_a_light_jacket_perfect_for_transiti_fde63e92-e49d-4815-a372-aa5bd356fd05_aowllp.png", "url": "" },
  "heavyJacket": { "label": "Heavy Jacket", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099794/weather-wardrobe-wizard/saito200_A_product_photo_of_a_heavy_jacket_highlighting_its_dur_84db2342-c834-4ad6-87bd-e9e721191f86_iyvwlz.png", "url": "" },
  "thickSweater": { "label": "Thick Sweater", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099731/weather-wardrobe-wizard/saito200_A_captivating_photo_of_a_thick_sweater_perfect_for_lay_1384c8c4-6a80-4211-a7e5-2721a5bf6fc3_oeslam.png", "url": "" },
  "lightSweater": { "label": "Light Sweater", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099758/weather-wardrobe-wizard/saito200_A_chic_product_photo_of_a_light_sweater_designed_for_l_4f920465-91be-4db4-bf8d-6838af97ef68_vat6d6.png", "url": "" },
  "waterproofJacket": { "label": "Waterproof Jacket", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099741/weather-wardrobe-wizard/saito200_A_product_photo_of_a_waterproof_jacket_showcasing_its__53afb622-2884-4a97-91db-a0dcbb6fa432_wrm9bo.png", "url": "" },
  "insulatedBoots": { "label": "Insulated Boots", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099745/weather-wardrobe-wizard/saito200_A_photo_of_a_pair_of_insulated_boots_emphasizing_their_7d2fc6d8-cc66-4e2f-a8f5-b06c95937968_abizo4.png", "url": "" },
  "thermalGloves": { "label": "Thermal Gloves", "imageUrl": "", "url": "" },
  "downJacket": { "label": "Down Jacket", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099727/weather-wardrobe-wizard/saito200_A_product_photo_of_a_down_jacket_showcasing_its_superi_63aba00f-779d-4725-89b5-868948b8c096_co6awf.png", "url": "" },
  "windbreaker": { "label": "Windbreaker", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099722/weather-wardrobe-wizard/saito200_A_product_photo_of_a_windbreaker_emphasizing_its_light_139ede03-e21c-4574-b876-e63ee7d2726b_ahwidi.png", "url": "" },
  "highVisibilityClothing": { "label": "High Visibility Clothing", "imageUrl": "", "url": "" },
  "warmCoat": { "label": "Warm Coat", "imageUrl": "", "url": "" },
  "lightBreathableDress": { "label": "Light Dress", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099624/weather-wardrobe-wizard/saito200_An_enchanting_photo_of_a_light_breathable_dress_perfec_88ab290d-fb4c-47da-87fb-958b052f00ea_mqroxh.png", "url": "" },
  "waterproofPants": { "label": "Waterproof Pants", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099737/weather-wardrobe-wizard/saito200_An_impressive_product_photo_of_a_pair_of_waterproof_pa_9af1d603-cfc3-43e6-9e5b-a884c759bc9e_zgm6qs.png", "url": "" },
  "sunglasses": { "label": "Sunglasses", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099646/weather-wardrobe-wizard/saito200_A_stylish_product_shot_of_a_pair_of_sunglasses_emphasi_4749ed7c-7822-41c5-920a-69e012c2b44a_kt6rjt.png", "url": "" },
  "umbrella": { "label": "Umbrella", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099635/weather-wardrobe-wizard/saito200_A_striking_photo_showcasing_a_sturdy_umbrella_perfect__321cbf15-ad0c-49e2-8636-bfc2e6a2dcd1_qomabk.png", "url": "" },
  "waterproofGloves": { "label": "Waterproof Gloves", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687100138/weather-wardrobe-wizard/saito200_An_eye-catching_photo_of_a_pair_of_waterproof_gloves_e_1c5db5fc-0e41-456b-bac4-31208bd87970_cq8s9f.png", "url": "" },
  "earMuffs": { "label": "Ear Muffs", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687100144/weather-wardrobe-wizard/saito200_A_product_photo_of_a_pair_of_ear_muffs_highlighting_th_e5ebf8f3-5245-43c8-813b-0474c1415859_zb0oiv.png", "url": "" },
  "faceMask": { "label": "Face Mask", "imageUrl": "", "url": "" },
  "sunscreen": { "label": "Sunscreen", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099663/weather-wardrobe-wizard/saito200_An_appealing_product_photo_of_a_tube_of_sunscreen_emph_ab78f19d-3596-4440-9dec-a1817c136422_lrcluw.png", "url": "" },
  "chapstick": { "label": "Chapstick", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099653/weather-wardrobe-wizard/saito200_A_detailed_photo_of_a_tube_of_chapstick_highlighting_i_840eec07-5668-403a-8b54-02ff903f849b_ea38rw.png", "url": "" },
  "moisturizer": { "label": "Moisturizer", "imageUrl": "", "url": "" },
  "insulatedWaterBottle": { "label": "Insulated Water Bottle", "imageUrl": "", "url": "" },
  "warmSocks": { "label": "Warm Socks", "imageUrl": "", "url": "" },
  "waterproofSocks": { "label": "Waterproof Socks", "imageUrl": "", "url": "" },
  "neckWarmer": { "label": "Neck Warmer", "imageUrl": "https://res.cloudinary.com/dicyllvry/image/upload/v1687099658/weather-wardrobe-wizard/saito200_A_captivating_product_photo_of_a_neck_warmer_emphasizi_064b8ba2-1c41-41f3-a654-2e7ca8ee1b13_fqfl2s.png", "url": "" }
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

  console.debug(layers);

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

// TODO: Redefine this logic
function getClothingForHumidity(maxHumidity: number): string[] {
  return []
  console.debug(`Getting clothing for humidity ${maxHumidity}`);
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


export type ClothingId = keyof typeof clothingMap;
export type ClothingSuggestionWithId = ClothingSuggestion & { id: ClothingId }

export const getClothingSuggestions = (forecast: WeatherForecast[] | null): ClothingSuggestionWithId[] | null => {
  if (!forecast) {
    return null
  }
  const { minTemp, maxTemp, weatherTypes, maxWindSpeed, maxHumidity } = forecast.reduce((acc, day) => {
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

  return handleClothingIds([
    ...getClothingForTemperature(minTemp, maxTemp),
    ...getClothingForWeather([...weatherTypes]),
    ...getClothingForWind(maxWindSpeed),
    ...getClothingForHumidity(maxHumidity)
  ])
};