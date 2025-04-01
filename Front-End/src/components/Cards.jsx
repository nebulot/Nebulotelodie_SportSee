import React from "react";
import PropTypes from 'prop-types';


import Card from "../components/Card";
import ApiData from "../utils/ApiData";

import '../styles/Cards.scss';


/**
 * @class
 * @classdesc Cards class component, renders a group of cards
 */
class Cards extends React.Component {
    /**
     * Get props and declares states
     * @param { String } props 
     */
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            data: {},
            loading: true,
        }
    }

    componentDidMount = () => {
        ApiData.getUserMainData(this.state.id)
            .then((res) => {
                this.setState({ data: res.keyData, loading: false })
            })
    }

    /**
     * Renders a group of cards
     * @returns { HTMLElement }
     */
    render() {
        return this.state.loading === true ? (
            <div></div>
        ) :
            (
                <section className="cards">
                    <Card type="Calories" value={this.state.data.calorieCount} />
                    <Card type="Glucides" value={this.state.data.proteinCount} />
                    <Card type="Lipides" value={this.state.data.carbohydrateCount} />
                    <Card type="Proteines" value={this.state.data.lipidCount} />
                </section>
            )
    }
}

Cards.propTypes = {
    id: PropTypes.string,
}

export default Cards