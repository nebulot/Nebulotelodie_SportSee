import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, LineChart, XAxis, YAxis, Tooltip, Line, Cell } from 'recharts';
import PropTypes from 'prop-types';

import CustomTooltip from '../components/CustomActivityTooltip';

import '../styles/Chart.scss';

const COLORS = ['#FF0000', '#FFFFFF']

/**
 * @class
 * @classdesc Chart class component, renders a chart
 */
class Chart extends React.Component {
    /**
     * Get props and declares states
     * @param { String } props 
     */
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            type: this.props.type,
            value: this.props.value
        };
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    /**
     * Renders a chart
     * @returns { HTMLElement }
     */
    render() {
        return (
            <React.StrictMode>
                {
                    this.state.type === "average_sessions" ?
                        <div className="chart average_sessions">
                            <p className='average_sessions_text'>Durée moyenne des sessions</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={this.state.value}
                                    margin={{
                                        top: 0,
                                        right: 10,
                                        left: 10,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="white" style={{ opacity: "0.5" }} />
                                    <YAxis hide={true} domain={[0, 'dataMax + 40']} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="sessionLength" stroke="white" style={{ opacity: "0.5" }} strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div> :
                        this.state.type==="performance" ?
                            <div className="chart performance">
                                <ResponsiveContainer width="100%" height="70%" className="radar">
                                    <RadarChart outerRadius="80%" data={this.state.value} >
                                    <PolarGrid radialLines={false}/>
                                    <PolarAngleAxis dataKey="label" stroke='white' tick={{fontSize:10, fontWeight:500}} tickLine={false} />
                                    <Radar dataKey="value" stroke="#FF0101B2" fill="#FF0101B2" fillOpacity={0.8} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div> :
                        this.state.type === "score" ?
                            <div className="chart score">
                                <p className='score__title'>Score</p>
                                <div className="score__value">
                                    <p className='score__value_percent'>{this.state.value[0].value}%</p>
                                    <p className='score__infos'>de votre objectif</p>
                                </div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={this.state.value}
                                            dataKey="value"
                                            innerRadius={60}
                                            outerRadius={70}
                                            startAngle={90}
                                            endAngle={450}
                                            cornerRadius="100%"
                                        >
                                            {this.state.value.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div> : ""
                }
            </React.StrictMode>
        )
    }
}

Chart.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number])
}

export default Chart