import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const Context = createContext()

/**
 * Provider of the data for the app using context and state
 *
 * @returns { React.Component } A React component returning the Context.Provider with the value of the state and the setState functions
 */
export const Provider = ({ children }) => {
	const [userToggle, setUserToggle] = useState(false)

	return (
		<Context.Provider
			value={{
				userToggle,
				setUserToggle,
			}}
		>
			{children}
		</Context.Provider>
	)
}

Provider.propTypes = {
	/**
	 * The children of the Provider component
	 */
	children: PropTypes.object.isRequired,
}