import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from 'react';
import { getDetails, Clean } from "../actions";
import { useParams } from "react-router-dom"

export default function GameDetail(){
    const dispatch = useDispatch();
    const gameDetail = useSelector((state) => state.detail);
    

    let{id} = useParams()
    useEffect(()=>{
        dispatch(getDetails(id))
        dispatch(Clean())
    },[dispatch])

   

    return(
        <div>
            {
                gameDetail.length>0 ?
                <div>
                    <h1>{gameDetail[0].name}</h1>
                    <img src={gameDetail[0].image ? gameDetail[0].image : 'img not found'}></img>
                    <h2>Descripcion: {gameDetail[0].description}</h2>
                    <h2>Lanzamiento: {gameDetail[0].released}</h2>
                    <h2>Rating: {gameDetail[0].rating}</h2>
                    <h2>Generos: {gameDetail[0].genres}</h2>                    
                    <h2>Plataformas: {gameDetail[0].platforms}</h2>
                </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
            <button>Volver</button>
            </Link>
        </div>
    )

}