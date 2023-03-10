import useStore from "@/store";
import { Line, LineChart, ReferenceLine, YAxis } from "recharts";
import { getTStr } from "@/util/util";
import { baseTheme, Box } from "@chakra-ui/react";

const TemperatureChart = ({
  data,
  pointWidth,
}: {
  data: { maxTemp: number; minTemp: number }[];
  pointWidth: number;
}): JSX.Element => {
  const { units } = useStore();
  return (
    <Box mx="auto">
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
              stroke={baseTheme.colors.gray[600]}
            />
          );
        })}
        <Line
          animationDuration={300}
          type="monotone"
          dataKey="maxTemp"
          stroke="#dfaa6e"
          dot={false}
          label={({ value, x, y, stroke = "white" }) => {
            return (
              <text
                x={x}
                y={y}
                dy={-20}
                fill={stroke}
                fontSize={16}
                textAnchor="middle"
              >
                {getTStr(value, units)}
              </text>
            );
          }}
        />
        <Line
          animationDuration={300}
          type="monotone"
          dataKey="minTemp"
          stroke="#61a4d1"
          dot={false}
          label={({ value, x, y, stroke = "white" }) => {
            return (
              <text
                x={x}
                y={y}
                dy={30}
                fill={stroke}
                fontSize={16}
                textAnchor="middle"
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
