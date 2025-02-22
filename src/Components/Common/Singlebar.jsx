import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomBarShape = (props) => {
    const { fill, x, y, width, height } = props;
  
    return (
      <g>
        <rect x={x} y={y} width={"20px"} height={height} fill={fill} rx={10} ry={10} />
      </g>
    );
  };
  

  
const data = [
  {
    name: 'Page A',
    uv: 4000,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,

    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,

    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,

    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,

    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,

    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    amt: 2100,
  },
];

export default class Singlebar extends PureComponent {
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
          <Bar dataKey="uv" fill="#82ca9d" shape={<CustomBarShape/>}  />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
