import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    r: 3000,
    b: 2400,
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    r: 3000,
    b: 2400,
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    r: 3000,
    b: 2400,
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    r: 3500,
    b: 2400,
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    r: 3100,
    b: 2200,
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    r: 3600,
    b: 3400,
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    r: 2000,
    b: 4100,
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function VizualizeOven () {

    return (
        <LineChart width={700} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#000000"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#008000" />
        <Line type="monotone" dataKey="r" stroke="#FF0000" />
        <Line type="monotone" dataKey="b" stroke="#0000FF" />
      </LineChart>
    );
}
