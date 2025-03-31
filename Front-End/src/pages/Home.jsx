import { useContext } from 'react'

import { Context } from '../context'

import ToggleButton from '../components/ToggleButton'
import ComingSoon from '../components/ComingSoon'

import '../styles/HomeStyles.scss'

/**
 * Render Home page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Home() {
  
	document.title = 'Accueil - SportSee'
	const { userToggle, setUserToggle } = useContext(Context)
 
	return (
		<section className="home">
			<div className="user-switch-wrapper">
				<p className="user-switch">
					Switch <span>Utilisateur</span> :
				</p>
				<ToggleButton
					id="userLink"
					checked={userToggle}
					onChange={setUserToggle}
					optionLabels={['18', '12']}
				/>
			</div>
			<ComingSoon />
		</section>
	)
  
}

console.log("Home component styles:", document.querySelector(".home")?.style);
console.log("ToggleButton styles:", document.querySelector("#userLink")?.style);
console.log("ComingSoon styles:", document.querySelector(".coming-soon")?.style);

export default Home