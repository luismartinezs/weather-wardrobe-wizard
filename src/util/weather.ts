export interface WeatherData {
  dt: number,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
  },
  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }],
  clouds: {
    all: number
  },
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  visibility: number,
  pop: number,
  sys: {
    pod: string
  },
  dt_txt: string
}

const getClothingSuggestions = (weatherData: WeatherData) => {
  const { temp, feels_like, humidity } = weatherData.main;
  const { description } = weatherData.weather[0];
  const clothing: string[] = [];
  if (temp >= 80) {
    clothing.push("light t-shirt", "shorts");
  } else if (temp >= 60 && temp < 80) {
    clothing.push("t-shirt", "jeans");
  } else if (temp >= 40 && temp < 60) {
    clothing.push("long-sleeved shirt", "jacket", "jeans");
  } else if (temp >= 20 && temp < 40) {
    clothing.push("heavy coat", "scarf", "hat", "gloves", "boots");
  } else {
    clothing.push("heavy coat", "scarf", "hat", "gloves", "boots");
  }
  if (description.includes("rain")) {
    clothing.push("raincoat");
  }
  if (description.includes("snow")) {
    clothing.push("snow boots");
  }
  return clothing;
};


export { getClothingSuggestions }