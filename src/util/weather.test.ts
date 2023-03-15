import { WeatherDataItem } from '@/types/weatherApi';
import { getClothingSuggestions, type WeatherForecast } from './weather';

type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
  T[P] extends object ? RecursivePartial<T[P]> :
  T[P];
};

const weatherData: { list: RecursivePartial<WeatherDataItem[]> } = {
  list: [
    {
      "dt": 1675609200,
      "main": {
        "temp": 20,
        "feels_like": 22,
        "humidity": 50,
      },
      "weather": [
        {
          "description": "clear sky",
          "icon": "01d",
          "main": "Clear",
          id: 800
        }
      ],
      "wind": {
        "speed": 5
      }
    },
    {
      "dt": 1675609200,
      "main": {
        "temp": 60,
        "feels_like": 55,
        "humidity": 80
      },
      "weather": [
        {
          "description": "rain"
        }
      ],
      "wind": {
        "speed": 10
      }
    }
  ]
};

const weatherForecast: WeatherForecast[] = [{
  date: '2021-07-01',
  avgTemp: 20,
  minTemp: 20,
  maxTemp: 20,
  minTempHour: '12:00',
  maxTempHour: '12:00',
  weatherType: 'Clear',
  weatherIcon: '01d'
}]

describe('getClothingSuggestions', () => {
  it('should return a list of clothing suggestions based on the weather conditions', () => {

    const expectedSuggestions = [
      ["Jeans", "Sunglasses", "Sweater", "T-shirt"],
      ["t-shirt", "jeans", "raincoat"]
    ];

    expect(getClothingSuggestions(weatherForecast)).toEqual(expectedSuggestions[0]);
  });
});
