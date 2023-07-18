import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts";

const Row1 = () => {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(3),
        };
      })
    );
  }, [data]);

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Expense And Revenue"
          subtitle="Top line is Revenue, Bottom line is Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            style={{ cursor: " pointer" }}
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              domain={[8000, 23000]}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              dot={true}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.primary.main}
              dot={true}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>


      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Top line is Revenue, Bottom line is Expenses"
          sideText="+12%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            style={{ cursor: " pointer" }}
            height={400}
            data={revenueProfit}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.secondary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>


      
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Monthly Revenue"
          subtitle="Graph Representing Monthly Revenue"
          sideText="+43%"
        />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={500}
            height={300}
            style={{ cursor: " pointer" }}
            data={revenue}
            margin={{
              top: 17,
              right: 45,
              left: -15,
              bottom: 70,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[700]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)"/>
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>


    </>
  );
};

export default Row1;
