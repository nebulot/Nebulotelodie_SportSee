import React from "react";
import PropTypes from 'prop-types';

import '../styles/CustomActivityTooltip.scss';




/**
 * @class
 * @classdesc CustomActivityTooltip class component, renders a tooltip
 */
class CustomActivityTooltip extends React.Component {
    /**
     * Renders a tooltip
     * @returns { HTMLElement }
     */
    render() {
        const { payload, active } = this.props;

        // Vérifier si 'payload' et ses éléments existent
        if (active && payload && payload.length > 1) {
            // Assure-toi que 'payload[0]' et 'payload[1]' sont définis
            const value1 = payload[0] && payload[0].value;
            const value2 = payload[1] && payload[1].value;

            return (
                <div className="activityTooltip">
                    <p className="activityTooltip__value">{value1 ? `${value1} kg` : 'N/A'}</p>
                    <p className="activityTooltip__value">{value2 ? `${value2} kCal` : 'N/A'}</p>
                </div>
            );
        }
        
        return null;
    }
}

CustomActivityTooltip.propTypes = {
    payload: PropTypes.array,
    active: PropTypes.bool
};

export default CustomActivityTooltip;
