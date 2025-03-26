import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import "../styles/CustomRadarChart.scss";
import PropTypes from 'prop-types';


/**
 * CustomRadarChart Component
 * 
 * @component
 * @param {Object} data - The data object for the chart
 * @param {Object[]} data.data.data - Array of objects containing individual data points for the radar chart
 * @param {number} data.data.data[].value - The value of the individual data point
 * @param {string} data.data.data[].kind - The kind of the individual data point
 * @param {Object} data.data.kind - Object with keys as the kind names and values as their corresponding display names
 * @returns {ReactElement} JSX element
 */

const CustomRadarChart = (data) => {

    const values = data.data.data.map(item => ({
        value: item.value,
        kind: data.data.kind[item.kind]
    }));



    return (
        <div className='sizeContainer'>

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart className='CustomRadar' width={258}
                    height={263}
                    cx="50%" cy="50%" outerRadius="60%" data={values}>
                    <PolarGrid gridType="polygon" radialLines={false} />
                    <PolarAngleAxis dataKey="kind" tick={{ fontSize: '12px', fill: '#ffffff' }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>

    );
};
CustomRadarChart.propTypes = {
    data: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.number.isRequired,
                kind: PropTypes.number.isRequired
            })
        ).isRequired,
        kind: PropTypes.objectOf(PropTypes.string).isRequired
    }).isRequired
};

export default CustomRadarChart;