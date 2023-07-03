import { useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const WeatherIcon = ({
  weatherCondition,
  iconCode,
}: {
  weatherCondition: string;
  iconCode: string;
}): JSX.Element => {
  const { colorMode } = useColorMode();
  const iconSrc = `/weather-icons/${colorMode}/${iconCode}.png`;
  const fallbackIconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const [imgSrc, setImgSrc] = useState(iconSrc);

  return (
    <Image
      src={imgSrc}
      alt={weatherCondition}
      width={75}
      height={75}
      onError={() => {
        setImgSrc(fallbackIconSrc);
      }}
    />
  );
};

export default WeatherIcon;
