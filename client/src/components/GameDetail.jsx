import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from 'react';
import { getDetails, Clean, deleteGame } from "../actions";
import { useParams } from "react-router-dom"
import './GameDetail.css'
import ImgNotFound from '../Background-image/ImgNotFound.jpg'

export default function GameDetail(){
    const dispatch = useDispatch();
    const gameDetail = useSelector((state) => state.detail);

    const {id} = useParams()
    useEffect(()=>{
        dispatch(getDetails(id))
        dispatch(Clean())
    },[dispatch])

    function gameDelete(){
        if(id.includes('-')){
            dispatch(deleteGame(id))
            alert('El VideoGame fue eliminado')
            window.location.href = "http://localhost:3000/home";
        } else return alert('El VideoGame no puede ser eliminado')
    }

   

    return(
        <div className="background-detail">            
                {
                    gameDetail.length > 0 ?
                    <div className="container">
                        <div className="Title-D"><h1 className="Title-Detail">{gameDetail[0].name}</h1></div>
                        <div className="Imagen-D"><img className='Img'src={gameDetail[0].image } ></img></div>            
                        <div className="Detalle-D">
                            <div className="info-detail">
                            <h2 >Descripcion: {gameDetail[0].description}</h2>
                            <h2 >Lanzamiento: {gameDetail[0].released}</h2>
                            <h2 >Rating: {gameDetail[0].rating}</h2>
                            <h2 >Generos: {gameDetail[0].genres}</h2>                    
                            <h2 >Plataformas: {gameDetail[0].platforms}</h2>
                            </div>                        
                        </div>
                        <div className="Botones-D">
                        <button className="button-GD" onClick={gameDelete}>Eliminar</button>
                        <Link to= '/home'>
                        <button className="button-GD">Volver</button>                
                        </Link>
                        </div>
                    </div> : <div id="blurringTextG" className="loading-hp"><div id="blurringTextG_1" class="blurringTextG">L</div><div id="blurringTextG_2" class="blurringTextG">o</div><div id="blurringTextG_3" class="blurringTextG">a</div><div id="blurringTextG_4" class="blurringTextG">d</div><div id="blurringTextG_5" class="blurringTextG">i</div><div id="blurringTextG_6" class="blurringTextG">n</div><div id="blurringTextG_7" class="blurringTextG">g</div><div id="blurringTextG_8" class="blurringTextG">.</div><div id="blurringTextG_9" class="blurringTextG">.</div><div id="blurringTextG_10" class="blurringTextG">.</div></div>
                }             
        </div>
    )

}