import React from "react";

export default function Card({image, name, genres, rating}){
    return (
        <div>
            <img src={image} alt='img not found' width="200px" height="250px"/>
            <h3 >{name}</h3>
            <h4 className="info-card">Generos:</h4>
            <h5 className="info-card">{genres}</h5>
            <h4 className="info-card">Rating:</h4>
            <h5 className="info-card">{rating}</h5>
        </div>
    )
}