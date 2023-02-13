import { getClothingSuggestions, type WeatherData } from '.';

type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
  T[P] extends object ? RecursivePartial<T[P]> :
  T[P];
};

describe('getClothingSuggestions', () => {
  it('should return a list of clothing suggestions based on the weather conditions', () => {
    const weatherData: RecursivePartial<WeatherData>[] = [
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
    ];

    const expectedSuggestions = [
      ["heavy coat", "scarf", "hat", "gloves", "boots"],
      ["t-shirt", "jeans", "raincoat"]
    ];

    weatherData.forEach((data, index) => {
      expect(getClothingSuggestions(data as WeatherData)).toEqual(expectedSuggestions[index]);
    });
  });
});
