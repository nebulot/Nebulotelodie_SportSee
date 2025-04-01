import React from 'react';
import { useParams } from 'react-router-dom';


import Welcome from '../components/Welcome';
import Activity from '../components/Activity';
import Charts from '../components/Charts';
import Cards from '../components/Cards';

import '../styles/Profil.scss'

/**
 * Creates app dashboard
 * @returns { HTMLElement }
 */
const Profil = () => {
    let {id} = useParams();
    return (
        <div className="wrap">
            <Welcome id={id}/>
            <section className='activity_charts_cards'>
                <div className="activity_charts">
                    <Activity id={id} />
                    <Charts id={id}/>
                </div>
                <Cards id={id}/>
            </section>
        </div>
    )
}

export default Profil