import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import "../styles/CustomLineChart.scss";


/**
 * CustomTooltip Component
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.active - Tooltip active state
 * @param {Object[]} props.payload - Array of data objects
 * @returns {ReactElement|null} JSX element or null
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { sessionLength } = payload[0].payload;
        const tooltipClasses = `custom-tooltip ${active ? 'active' : ''}`;

        return (
            <div className='ContainerTime'>
                <div className={tooltipClasses}>
                    <p className="label"> {sessionLength} min</p>
                </div>
            </div>
        );
    }
    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            payload: PropTypes.shape({
                sessionLength: PropTypes.number,
            }),
        })
    ),
};

/**
 * CustomLineChart Component
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.data - The data for the chart.
 * @returns {ReactElement} JSX element
 */
const CustomLineChart = ({ data }) => {
    const daysOfTheWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    if (!data || !data.sessions) {
        return <div>Chargement...</div>;
    }

    return (
        <div className='sizeContainer'>
            <div className='chartLineLabel'>Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data.sessions}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis 
                        dataKey="" 
                        tickFormatter={(tickItem) => daysOfTheWeek[tickItem]} 
                        axisLine={false} 
                        stroke="#FFFFFF" 
                    />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        position={{ y: 100 }} 
                        cursor={{ stroke: 'rgba(0, 0, 0, 0.2)', strokeWidth: 60 }} 
                    />
                    <Line
                        type="monotone"
                        dataKey="sessionLength"
                        stroke="#FFFFFF"
                        activeDot={{ r: 3 }}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

CustomLineChart.propTypes = {
    data: PropTypes.shape({
        sessions: PropTypes.arrayOf(
            PropTypes.shape({
                sessionLength: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default CustomLineChart;
