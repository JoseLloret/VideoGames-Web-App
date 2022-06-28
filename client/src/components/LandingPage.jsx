import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function landingpage(){
    return(
        <div className="C-LP">
            <div className="LP">
                <p>VIDEO GAME STORE</p>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}
