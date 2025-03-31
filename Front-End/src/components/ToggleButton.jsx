import React from 'react'
import PropTypes from 'prop-types'

import '../styles/ToggleButton.scss'

/**
 * Render a Toggle Switch calling a function
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
const ToggleSwitch = ({
	id,
	checked,
	onChange,
	name,
	optionLabels,
	small,
	disabled,
}) => {
	function handleKeyPress(e) {
		if (e.keyCode !== 32) return

		e.preventDefault()
		onChange(!checked)
	}
	console.log("ToggleButton component is rendering");


	return (
		<div className={'toggle-switch' + (small ? ' small-switch' : '')}>
			<input
				type="checkbox"
				name={name}
				className="toggle-switch-checkbox"
				id={id}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				disabled={disabled}
			/>
			{id ? (
				<label
					className="toggle-switch-label"
					tabIndex={disabled ? -1 : 1}
					onKeyDown={(e) => handleKeyPress(e)}
					htmlFor={id}
				>
					<span
						className={
							disabled
								? 'toggle-switch-inner toggle-switch-disabled'
								: 'toggle-switch-inner'
						}
						data-yes={optionLabels[0]}
						data-no={optionLabels[1]}
						tabIndex={-1}
					/>
					<span
						className={
							disabled
								? 'toggle-switch-switch toggle-switch-disabled'
								: 'toggle-switch-switch'
						}
						tabIndex={-1}
					/>
				</label>
			) : null}
		</div>
	)
}

ToggleSwitch.propTypes = {
	/**
	 * Id of the checkbox
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Whether or not the checkbox is checked
	 */
	checked: PropTypes.bool.isRequired,
	/**
	 * Function that is called when the checkbox is clicked
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Name of the checkbox
	 */
	name: PropTypes.string,
	/**
	 * Labels of the checkbox
	 */
	optionLabels: PropTypes.array,
	/**
	 * Whether or not the checkbox is small
	 */
	small: PropTypes.bool,
	/**
	 * Whether or not the checkbox is disabled
	 */
	disabled: PropTypes.bool,
}

ToggleSwitch.defaultProps = {
	optionLabels: ['Yes', 'No'],
}


export default ToggleSwitch

