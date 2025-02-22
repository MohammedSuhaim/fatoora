import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const CustomBarShape = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <g>
      <rect x={x} y={y} width={"10px"} height={height} fill={fill} rx={10} ry={10} />
    </g>
  );
};





const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'July',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Aug',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sep',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Oct',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },

  {
    name: 'Nov',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Bargraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" shape={<CustomBarShape/>} />
          <Bar dataKey="uv" fill="#82ca9d" shape={<CustomBarShape/>} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
