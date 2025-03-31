import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import  icons  from '../assets/icons';
import '../styles/SideBar.scss';

/**
 * SidebarButton Component
 *
 * This component renders an icon inside a button for the sidebar.
 *
 * @component
 * @param {Object} props - The properties.
 * @param {string} props.logo - The logo path.
 * @returns {ReactElement} JSX element
 */
const SidebarButton = ({ logo, alt }) => (
    <button className="sidebar-button">
        <img src={logo} alt={`Logo ${alt}`} className="sidebar-button-logo" />
    </button>
);

SidebarButton.propTypes = {
    logo: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

/**
 * Sidebar Component
 *
 * This component renders a sidebar with sport icons linking to different sections.
 *
 * @component
 * @returns {ReactElement} JSX element
 */
const Sidebar = () => {
    const sports = [
        { key: 'yoga', alt: 'Yoga' },
        { key: 'swimming', alt: 'Natation' },
        { key: 'bike', alt: 'Cyclisme' },
        { key: 'musculation', alt: 'Musculation' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-button-wrapper center">
                {sports.map(({ key, alt }) => (
                    <Link key={key} to="/">
                        <SidebarButton logo={icons[key]} alt={alt} />
                    </Link>
                ))}
            </div>
            <p className="copyright">Copyright, SportSee 2020</p>
        </aside>
    );
};

export default Sidebar;