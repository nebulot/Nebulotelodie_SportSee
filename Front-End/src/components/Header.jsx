import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { Context } from '../context'

import logo from '../assets/logoTrend.svg'

import '../styles/Header.scss'  // ✅ Correct si Header.scss est dans /styles/


/**
 * Render the Header with a logo and a navbar
 * The user's profile page is determined by the userToggle state in the Context
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function Header() {
	const { userToggle } = useContext(Context)
	const userId = userToggle ? 18 : 12

	return (
		<header className="nav-wrapper">
			<Link to="/">
				<img
					src={logo}
					alt="SportSee Logo"
					className="nav-logo vertical-center"
				/>
			</Link>
			<nav className="nav vertical-center">
				<NavLink
					className={({ isActive }) =>
						isActive ? 'nav-active' : 'nav-link'
					}
					to="/"
				>
					Accueil
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? 'nav-active' : 'nav-link'
					}
					to={`/profil/${userId}`}
				>
					Profil
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? 'nav-active' : 'nav-link'
					}
					to="/settings"
				>
					Réglage
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? 'nav-active' : 'nav-link'
					}
					to="/community"
				>
					Communauté
				</NavLink>
			</nav>
		</header>
	)
}

export default Header