import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import{getGames,getGenres, CleanGames,filtroAsc, filtroDesc, filtroMax, filtroMin, filtroGenre} from '../actions'
import Card from "./Card";
import SearchBar from "./SearchBar";
import Paginado from "./Paginado";


export default function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector((state)=> state.games);
    const allGenres = useSelector((state)=> state.genres)
    const [orderAlfabet, setOrderAlfabet] = useState('');
    const [orderRating, setOrderRating] = useState('');
    // const [filterGenre, setFilterGenre] = useState('')
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
        console.log(pageNumber)
        setCurrentPage(pageNumber)
    }

    function alfabetChange(e){
        e.preventDefault();
        if(e.target.value === 'az'){
            dispatch(filtroAsc())
        } else if(e.target.value === 'za'){
            dispatch(filtroDesc())
        }
        setOrderAlfabet(e.target.value)
    }
    function ratingChange(e){
        e.preventDefault();
        if(e.target.value === 'min'){
            dispatch(filtroMin())
        } else if(e.target.value === 'max'){
            dispatch(filtroMax())
        }
        setOrderRating(e.target.value)
    }
    // function genreChange(e){
    //     setFilterGenre(e.target.value)
    // }
    function handleFilterStatus(e){
        dispatch(filtroGenre(e.target.value))
    }
    



    return (
        <div>
            <div>
                <h1>VIDEOGAMES</h1>
                <div className="crear"><Link to= '/videogame'>agregar videojuego</Link></div>
                <div><SearchBar/></div>
                <div><button onClick={(e)=>refresh(e)}>Recargar</button></div>
            </div>
            <div>
                <select value={orderAlfabet} onChange= {alfabetChange}>
                    <option value="">Orden Alfabetico</option>               
                    <option value= "az">Ascendente a descendente</option>  
                    <option value= "za">Descendente a ascendente</option>
                </select>
                <select value={orderRating} onChange= {ratingChange}>
                    <option value="">Orden Rating</option> 
                    <option value='min'>1 - 5</option>
                    <option value='max'>5 - 1</option>
                </select>
                <select onChange={e =>handleFilterStatus(e)}>
                <option value="all">Seleccionar Genero</option>                    
                    {allGenres.map((e)=>(
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>
            </div>

            <div>
                {/* {filterGenre && 
                allGames
                .filter((g)=> g.genres?.includes(filterGenre))
                .slice(indexOfFirstGame, indexOfLastGame)
                .map((c)=>{
                        return(
                            <Link to={"/home/" + c.id}>
                            <Card name={c.name} image={c.image} genres={c.genres} rating={c.rating}/>
                            </Link> 
                        )
                    }
                )} */}
                {currentGame.map( (c) =>{
                    return(
                        <Link to={"/home/" + c.id}>
                        <Card name={c.name} image={c.image} genres={c.genres} rating={c.rating}/>
                        </Link> 
                    )
                })}
            </div>

            <div>
                <Paginado
                gamesPerPage={gamesPerPage} // 15
                allGames={allGames.length} // 100
                paginado={paginado}
                />
            </div>        
        </div>
    )














}
