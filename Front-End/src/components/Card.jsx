import React from "react";
import PropTypes from 'prop-types';

import icons from "../assets/icons";

import '../styles/Card.scss';

/**
 * Creates a card
 * @param { String } props 
 * @returns { HTMLElement } returns a card
 */
const Card = (props) => {
    const type=props.type;
    let icon,unit;
    const value=props.value;
    if(type==="Calories"){
        icon=icons.calories
        unit="kCal";
    }else if(type==="Glucides"){
        icon=icons.glucides;
        unit="g";
    }else if(type==="Lipides"){
        icon=icons.lipides;
        unit="g";
    }else if(type==="Proteines"){
        icon=icons.proteins;
        unit="g";
    }
    return(
        <div className="card">
            <img src={icon} alt="icon" className="card__icon"/>
            <div className="card__title_value">
                <p className="card__value">{value}{unit}</p>
                <p className="card__title">{type}</p>
            </div>
        </div>
    )
}

Card.propTypes={
    type:PropTypes.string,
    value:PropTypes.number
}

export default Card