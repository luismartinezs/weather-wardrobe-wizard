import Image from "next/image";

const WeatherIcon = ({
  weatherCondition,
  iconCode,
}: {
  weatherCondition: string;
  iconCode: string;
}): JSX.Element => {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt={weatherCondition}
      width={80}
      height={80}
    />
  );
};

export default WeatherIcon;
