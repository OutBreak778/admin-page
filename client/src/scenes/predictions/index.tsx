import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useState, useMemo } from "react";
import regression, {DataPoint} from "regression"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Label,
} from "recharts";

const Predictions = () => {
  const { palette } = useTheme();
  const [Predictions, setPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  // Providing the Regression line for the prediction purpose 

  const FormatedData = useMemo(()=> {
    if(!kpiData) return[];

    const monthData = kpiData[0].monthlyData;

    const formatted : Array<DataPoint> = monthData.map(
      ({revenue},i:number) =>{
        return [i,revenue]
      }
    )

      const regressionLine = regression.linear(formatted);

      return monthData.map(({month, revenue}, i:number)=> {
        return {
          name: month,
          "Actual Revenue": revenue,
          "Regression Line": regressionLine.points[i][1],
          "Predicted Revenue": regressionLine.predict(i + 12)[1]
        }
      })

  },[kpiData])

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="2.5rem">
        <Box>
          <Typography variant="h2">Revenue Predictions</Typography>
          <Typography variant="h5">
            Charted Revenue and Predicted Revenue based in Linear Regression
            Model
          </Typography>
        </Box>
        <Button
          onClick={() => setPredictions(!Predictions)}
          sx={{
            color: palette.grey[200],
            fontWeight: "700",
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2)",
          }}
        >
          Predicted Revenue
        </Button>
      </FlexBetween>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          style={{ cursor: " pointer" }}
          data={FormatedData}
          margin={{
            top: 15,
            right: 65,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3 " stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[8000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            tickFormatter={(v) => `$${v}`}
            style={{ fontSize: "10px" }}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {Predictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
