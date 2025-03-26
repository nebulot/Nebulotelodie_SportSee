import React from 'react';
import PropTypes from 'prop-types';

/**
 * Nutritional Component
 * 
 * This component is responsible for displaying a nutritional information item.
 *
 * @component
 * @param {Object} props
 * @param {string} props.logo - The URL of the logo to be displayed
 * @param {string} props.title - The title of the nutritional information item
 * @param {number} props.value - The numerical value of the nutritional information item
 * @param {string} props.unit - The unit of the nutritional information item
 * @returns {ReactElement} JSX element
 */

const Nutritional = ({ logo, title, value, unit }) => {
    return (
        <div className='InfoNutritional'>
            <img src={logo} alt="imageLogo" />
            <div className='uniteContainer'>

                <p className='title'>{title}</p>
                <p className='value'>{value}{unit}</p>
            </div>
        </div>
    );
};

Nutritional.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired
};

export default Nutritional;