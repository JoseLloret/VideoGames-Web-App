import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import{getGames,getGenres, filtroFromDb, filtroFromApi,filtroAsc, filtroDesc, filtroMax, filtroMin, filtroGenre, filtroFrom} from '../actions'
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";
import './Home.css'
import './loading.css'


export default function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector((state)=> state.games);
    const allGenres = useSelector((state)=> state.genres)
    const [orderAlfabet, setOrderAlfabet] = useState('');
    const [orderRating, setOrderRating] = useState('');
    // const [orderFrom, setOrderFrom] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage // => 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // => 0
    const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame) // me devuelve 15 juegos

    useEffect(()=>{
        dispatch(getGames());
    },[dispatch])
    useEffect(()=>{
        dispatch(getGenres());
    },[dispatch])

    function refresh(){
        window.location.reload()
    }
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function alfabetChange(e){
        e.preventDefault();
        if(e.target.value === 'az'){
            dispatch(filtroAsc())
        } else if(e.target.value === 'za'){
            dispatch(filtroDesc())
        }
        setCurrentPage(1)
        setOrderAlfabet(e.target.value)
    }
    function ratingChange(e){
        e.preventDefault();
        if(e.target.value === 'min'){
            dispatch(filtroMin())
        } else if(e.target.value === 'max'){
            dispatch(filtroMax())
        }
        setCurrentPage(1)
        setOrderRating(e.target.value)
    }
    // function fromChange(e){
    //     e.preventDefault();
    //     if(e.target.value === 'db'){
    //         dispatch(filtroFromDb())
    //     }else if(e.target.value === 'api'){
    //         dispatch(filtroFromApi())
    //     }
    //     setOrderFrom(e.target.value)
    // }
    function handleFilterStatus(e){
        dispatch(filtroGenre(e.target.value))
        setCurrentPage(1)
        console.log(e.target.value)
    }
    function handleFilterFrom(e){
        dispatch(filtroFrom(e.target.value))
        setCurrentPage(1)
        console.log(e.target.value)
    }
    



    return (
        <div className="C-HM">
            { allGames.length >0 ?
            <div className="Conteiner">
                <div className="Title"><h1>VIDEOGAMES</h1></div>
                <div className="Head">                
                    <div className="crear"><button><Link to= '/videogame'>agregar videojuego</Link></button></div>
                    <div className="search"><SearchBar/></div>
                    <div className="refr"><button onClick={(e)=>refresh(e)}>Recargar</button></div>
                </div>
                <div className="Filters">
                    <div className="AZ">
                    <select  value={orderAlfabet} onChange= {alfabetChange}>
                        <option value="">Orden Alfabetico</option>               
                        <option value= "az">Ascendente a descendente</option>  
                        <option value= "za">Descendente a ascendente</option>
                    </select>
                    </div>
                    <div className="RT">
                    <select  value={orderRating} onChange= {ratingChange}>
                        <option value="">Orden Rating</option> 
                        <option value='min'>1 - 5</option>
                        <option value='max'>5 - 1</option>
                    </select>
                    </div>
                    <div className="GR">
                    <select  onChange={e =>handleFilterStatus(e)}>
                    <option value="all">Seleccionar Genero</option>                    
                        {allGenres.map((e)=>(
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className="AB">
                    <select   onChange= {e=> handleFilterFrom(e)}>
                        <option value="">Info Desde</option>               
                        <option value= "api">Desde API</option>  
                        <option value= "db">Desde DB</option>
                    </select>
                    </div>
                </div>
            
                <div className="Games">
                    {currentGame.map( (c) =>{
                        return(
                            <Link to={"/home/" + c.id}>
                            <Card name={c.name} image={c.image} genres={c.genres} rating={c.rating}/>
                            </Link> 
                        )
                    })}
                </div>

                <div className="Paginado">
                    <Paginado
                    gamesPerPage={gamesPerPage} // 15
                    allGames={allGames.length} // 100
                    paginado={paginado}
                    />
                </div>
            </div> : <div id="blurringTextG"><div id="blurringTextG_1" class="blurringTextG">L</div><div id="blurringTextG_2" class="blurringTextG">o</div><div id="blurringTextG_3" class="blurringTextG">a</div><div id="blurringTextG_4" class="blurringTextG">d</div><div id="blurringTextG_5" class="blurringTextG">i</div><div id="blurringTextG_6" class="blurringTextG">n</div><div id="blurringTextG_7" class="blurringTextG">g</div><div id="blurringTextG_8" class="blurringTextG">.</div><div id="blurringTextG_9" class="blurringTextG">.</div><div id="blurringTextG_10" class="blurringTextG">.</div></div>
            }             
        </div>
    )














}
