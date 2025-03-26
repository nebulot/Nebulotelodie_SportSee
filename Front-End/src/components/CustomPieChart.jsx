import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

import "../styles/CustomPieChart.scss";

/**
 * CustomPieChart Component
 * 
 * @component
 * @param {Object} props
 * @param {number} props.data - The data for the chart as a decimal (eg. 0.5 for 50%)
 * @returns {ReactElement} JSX element
 */

const CustomPieChart = ({ data }) => {
  const percentData = data * 100; // transformer les données en pourcentage
  const chartData = [{ name: 'Value', value: percentData }, { name: 'invert', value: 100 - percentData }];

  return (
    <div className='sizeContainer' >
      <div className='chartPieLabel'>Score</div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart className='CustomPie' width={258} height={263}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            startAngle={90} // commencer à midi
            endAngle={360 + 90} // utiliser l'angle de fin calculé
            innerRadius="0%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key={`cell-0`} fill="#FFFFFF" />
            <Cell key={`cell-1`} fill="#FFFFFF" />
          </Pie>
          <Pie
            data={[{ name: 'Value', value: percentData }]}
            cx="50%"
            cy="50%"
            startAngle={90} // commencer à midi
            endAngle={360 * (percentData / 100) + 90} // utiliser l'angle de fin calculé
            innerRadius="70%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key={`cell-2`} fill="#FF0000" />

          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='textCenter'>
        <span className='percent'>
          {`${percentData}%`}
        </span>
        <span className='textPercent'>
          {`de votre objectif`}
        </span>
      </div>
    </div>
  );
};

CustomPieChart.propTypes = {
  data: PropTypes.number.isRequired,
};

export default CustomPieChart;