import React from 'react';
import { Link } from 'react-router-dom';
import icons from "../assets/icons";

import "../styles/SideBar.scss"



/**
 * SideBar Component
 * 
 * This component is responsible for rendering the sidebar with links to the various routes.
 * Each link is represented by an icon for a particular sport.
 *
 * @component
 * @returns {ReactElement} JSX element
 */

const SideBar = () => {
    return (
        <div className='sideBarContainer'>
            <div className='LogoContainer'>

                <Link to="/" >
                    <img src={icons.yoga} alt="Logo yoga" />
                </Link>
                <Link to="/" >
                    <img src={icons.swimming} alt="Logo swimming" />
                </Link>
                <Link to="/" >
                    <img src={icons.bike} alt="Logo cycling" />
                </Link>
                <Link to="/" >
                    <img src={icons.musculation} alt="Logo bodybuilding" />
                </Link>
            </div>
            <div className='copyright'>
                <p>Copyright, SportSee 2020</p>

            </div>
        </div>
    );
};

export default SideBar;