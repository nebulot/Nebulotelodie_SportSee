import React from "react";
import PropTypes from 'prop-types';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiData from "../utils/ApiData";
import CustomActivityTooltip from "../components/CustomActivityTooltip";

import '../styles/Activity.scss';

/**
 * @class
 * @classdesc Activity class component, renders a chart
 */
class Activity extends React.Component {
  /**
   * Get props and declares states
   * @param { String } props 
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      userActivity: {},
      loading: true,
    }
  }

  componentDidMount = () => {
    ApiData.getUserActivity(this.state.id)
      .then((res) => {
        this.setState({ userActivity: res, loading: false })
      });
  }

  /**
   * Renders a chart
   * @returns { HTMLElement }
   */
  render() {
    return this.state.loading === true ? (
      <div></div>
    ) : (
      <section className="activity">
        <p className="activity__daily">Activité quotidienne</p>
        <ResponsiveContainer minWidth={400} minHeight={300}>
          <BarChart data={this.state.userActivity.sessions} width={700} height={320}  margin={{ top: 20, right: 0, left: 0, bottom: 5 }} >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis orientation="right" yAxisId="right" tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
          <YAxis orientation="left" yAxisId="left" domain={['dataMin - 50', 'dataMax + 50']} hide={true} />
          <Tooltip content={<CustomActivityTooltip />} />
          <Legend align="right" verticalAlign="top" height={50} iconType="circle" />
          <Bar dataKey="kilogram" name="Poids (kg)" yAxisId="right" fill="#282D30" barSize={7} radius={[50, 50, 0, 0]} />
          <Bar dataKey="calories" name="Calories brûlées (kCal)" yAxisId="left" fill="#E60000" barSize={7} radius={[50, 50, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </section>
    )
  }
}

Activity.propTypes = {
  id: PropTypes.string,
}

export default Activity