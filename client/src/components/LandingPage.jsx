import React from "react";
import {Link} from 'react-router-dom';

export default function landingpage(){
    return(
        <div>
            <div>
                <p>VIDEO GAME STORE</p>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}
