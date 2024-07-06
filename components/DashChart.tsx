import React from "react";
import { Status } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from "recharts";

type DataElements = {
  name: Status;
  total: number;
};

type DataProps = {
  data: DataElements[];
};

const DashChart = ({ data }: DataProps) => {
  console.log("Data", data);
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashChart;
