import { Line, LineChart, ReferenceLine, YAxis } from "recharts";
import {
  baseTheme,
  Box,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUnits } from "@/features/units/hooks/useUnits";
import { getTStr } from "@/utils/temperature";

const blue = {
  light: "#1a93e4",
  dark: "#61a4d1",
};

const orange = {
  light: "#f48d19",
  dark: "#dfaa6e",
};

const TemperatureChart = ({
  data,
  pointWidth,
}: {
  data: { maxTemp: number; minTemp: number }[];
  pointWidth: number;
}): JSX.Element => {
  const { units } = useUnits();
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const label = useColorModeValue("gray.800", "white");

  return (
    <Box mx="auto" color={label}>
      <LineChart
        // I had to add a magic factor here because I don't understand how the size of the LineChart is calculated
        width={data.length * pointWidth * 1.09}
        height={250}
        data={data}
        margin={{
          top: 40,
          right: pointWidth / 2,
          left: pointWidth / 2,
          bottom: 50,
        }}
      >
        <YAxis type="number" domain={["minTemp", "maxTemp"]} hide />
        {data.map((d, i) => {
          return (
            <ReferenceLine
              key={i}
              segment={[
                { x: i, y: d.minTemp },
                { x: i, y: d.maxTemp },
              ]}
              stroke={
                isLight
                  ? baseTheme.colors.gray[300]
                  : baseTheme.colors.gray[600]
              }
            />
          );
        })}
        <Line
          isAnimationActive={false}
          animationDuration={300}
          type="monotone"
          dataKey="maxTemp"
          stroke={orange[colorMode]}
          dot={false}
          label={({ value, x, y, stroke = isLight ? "black" : "white" }) => {
            return (
              <text
                x={x}
                y={y}
                dy={-20}
                fill={stroke}
                fontSize={16}
                textAnchor="middle"
                data-testid="max-temp"
              >
                {getTStr(value, units)}
              </text>
            );
          }}
        />
        <Line
          isAnimationActive={false}
          animationDuration={300}
          type="monotone"
          dataKey="minTemp"
          stroke={blue[colorMode]}
          dot={false}
          label={({ value, x, y, stroke = isLight ? "black" : "white" }) => {
            return (
              <text
                x={x}
                y={y}
                dy={30}
                fill={stroke}
                fontSize={16}
                textAnchor="middle"
                data-testid="min-temp"
              >
                {getTStr(value, units)}
              </text>
            );
          }}
        />
      </LineChart>
    </Box>
  );
};

export default TemperatureChart;
