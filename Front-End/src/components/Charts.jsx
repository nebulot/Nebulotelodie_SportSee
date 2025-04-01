
import React from 'react';
import PropTypes from 'prop-types';


import Chart from '../components/Chart';
import ApiData from '../utils/ApiData';

import '../styles/Charts.scss';


/**
 * @class
 * @classdesc Charts class component, renders a group of charts
 */
class Charts extends React.Component {
    /**
     * Get props and declares states
     * @param { String } props 
     */
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            sessions: {},
            performance: {},
            score: {},
            loading_sessions: true,
            loading_performance: true,
            loading_score: true,
        }
    }

    componentDidMount = () => {
        ApiData.getUserAverageSessions(this.state.id)
            .then((res) => {
                this.setState(
                    {
                        sessions: res.sessions,
                        loading_sessions: false
                    })
            });

        ApiData.getUserPerformance(this.state.id)
            .then((res) => {
                this.setState(
                    {
                        performance: Object.values(res),
                        loading_performance: false
                    })
            });

        ApiData.getUserMainData(this.state.id)
            .then((res) => {
                this.setState(
                    {
                        score: res.score,
                        loading_score: false
                    })
            });
    }

    /**
     * Renders a group of charts
     * @returns { HTMLElement }
     */
    render() {
        return this.state.loading_sessions === false && this.state.loading_performance === false && this.state.loading_score === false ?
            (
                <div className="charts">
                    <Chart type="average_sessions" value={this.state.sessions} />
                    <Chart type="performance" value={this.state.performance} />
                    <Chart type="score" value={this.state.score} />
                </div>
            )
            : (
                <div></div>
            )
    }
}

Charts.propTypes = {
    id: PropTypes.string
}

export default Charts