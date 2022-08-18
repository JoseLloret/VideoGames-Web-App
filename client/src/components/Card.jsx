import React from "react";
import './Card.css'

export default function Card({image, name, genres, rating}){
    return (
        <div className="card">
            <img className="img-card" src={image} alt='img not found'/>
            <h3 className="tit-card">{name}</h3>
            <h4 className="info-card">Generos:</h4>
            <h5 className="info-card">{genres}</h5>
            <h4 className="info-card">Rating:</h4>
            <h5 className="info-card">★ {rating}</h5>
        </div>
    )
}