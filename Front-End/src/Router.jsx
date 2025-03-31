import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Profil from './pages/Profil';
import Settings from './pages/Settings';
import Community from './pages/Community';

/**
 * Router to render the Header, the Sidebar and the 4 pages of the application
 *
 * @category Router
 * @component
 * @returns { React.Component } A React component
 */
function Router() {
	console.log("Router component is rendering"); 
	return (
		<React.StrictMode>
			<BrowserRouter >
				<Header />
				<Sidebar />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/profil/:userId" element={<Profil />} />
					<Route exact path="/settings" element={<Settings />} />
					<Route exact path="/community" element={<Community />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	)
}

export default Router