import React from 'react';
import "../styles/CustomBarChart.scss"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Text, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';


/**
 * CustomBarChart Component
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.data - The data for the chart.
 * @returns {ReactElement} JSX element
 */
const CustomBarChart = ({ data }) => {

  const maxAxisYValue = Math.max(...data.sessions.map(session => session.kilogram));

  /**
   * CustomTooltip component for the CustomBarChart
   * 
   * @component
   * @param {Object} props
   * @param {boolean} props.active - Tooltip active state
   * @param {Object[]} props.payload - Array of data objects
   * @returns {ReactElement|null} JSX element or null
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map((entry, index) => (
            <p key={index} className={entry.dataKey}>
              {entry.value} {entry.dataKey === "kilogram" ? "kg" : "kCal"}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };


  return (
    <div className='CustomBar'>
      <h2 className='chart-title'>Activité quotidienne</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <BarChart data={data.sessions} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="" tickFormatter={(value) => (value + 1).toString()} />
            <YAxis domain={[0, maxAxisYValue]} orientation="right" />
            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                top: '20px',
                right: '20px',
                margin: '20px',
                bottom: '100px',
                fontSize: '14px'

              }}
              verticalAlign="top"
              align="right"
              iconType="circle"
            />
            <Bar dataKey="kilogram" fill="#282D30" name="Poids (kg)" barSize={7} radius={[10, 10, 0, 0]} />
            <Bar dataKey="calories" fill="#E60000" name="Calories brûlées (kCal)" barSize={7} radius={[10, 10, 0, 0]} />
            <Text>Activité quotidienne</Text>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

CustomBarChart.propTypes = {
  data: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CustomBarChart;