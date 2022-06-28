import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import{getGenres, postGame, getPlatforms} from '../actions'
import './GameCreate.css'

function validate(input){
    let errors ={};
    if(!input.name){
        errors.name = 'Falta ingresar un Nombre'
    } else if(!input.description){
            errors.description = 'Falta ingresar una Descripcion'
    }else if(!input.realesed){
        errors.realesed = 'Falta ingresar fecha de lanzamiento'
    }else if(input.image.slice(0,7) !== 'https://'){
        errors.image = 'Ingrese una URL valida'
    }
    return errors
}

export default function GameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state)=> state.genres);
    const platforms = useSelector((state)=> state.platforms);
    const [errors, setErrors] = useState({});
    const clean = {
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        image: ""
    }
    useEffect(()=>{
        dispatch(getGenres())
    }, [])
    useEffect(()=>{
        dispatch(getPlatforms())
    }, [])
    


    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        image: ""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value            
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(e.target.value)
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        console.log(e.target.value)
    }
    function handleSelectPlatform(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        console.log(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!input.name) return alert('Falta ingresar nombre')
        if(!input.description) return alert('Falta ingresar descripcion')
        if(!input.released) return alert('Falta ingresar lanzamiento')
        if(!input.rating) return alert('Falta ingresar rating')
        if(input.image.slice(0,8) !== 'https://') return alert('Ingrese una URL valida')
        dispatch(postGame(input))
        alert('VideoGame Agregado!!')
        console.log(input)
        setInput(clean)
        window.location.href = "http://localhost:3000/home";
    }
    function handleDelete(e) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e)
        })
    }
    function handleDeletePlatform(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(g => g !== e)
        })
    }
    function handleReset(e){
        setInput(clean)
    }


    return(
        <div className="background">
            <div className="C-GC">
                <div className="Title"><h1>AGREGA TU JUEGO</h1></div>           
                
                    <form onSubmit={(e)=> handleSubmit(e)}>
                        <div className="Form">
                            <div className="div1">
                            <div >
                                <label>Video juego: </label>
                                <input 
                                type="text"
                                value= {input.name}
                                name = "name"
                                onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className='error'>{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label>Descripcion: </label>
                                <input 
                                type="text"
                                value= {input.description}
                                name = "description"
                                onChange={handleChange}
                                />
                                {errors.description && (
                                    <p className='error'>{errors.description}</p>
                                )}
                            </div>
                            <div>
                                <label>Lanzamiento: </label>
                                <input 
                                type="date"  
                                name="released"
                                min="2018-01-01" max=""
                                onChange={handleChange}/>
                                {errors.released && (
                                    <p className='error'>{errors.realesed}</p>
                                )}
                            </div>
                            <div>
                                <label>Rating: </label>
                                <input 
                                type="number"
                                value= {input.rating}
                                name = "rating"
                                min="0"
                                max="5"
                                step=".01"
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                            <label>Genero: </label>
                            <select onChange={(e)=> handleSelect(e)} >
                            {genres.map((g)=>(
                            <option value ={g.name}>{g.name}</option>
                            ))}
                            </select>
                            </div>
                            <div>
                            <label>Plataforma: </label>
                            <select onChange={(e)=> handleSelectPlatform(e)} >
                            {platforms.map((p)=>(
                            <option value ={p.name}>{p.name}</option>
                            ))}
                            </select>
                            </div>                            
                            <div>
                                <label>Imagen URL: </label>
                                <input 
                                type="text"
                                value= {input.image}
                                name = "image"
                                onChange={handleChange}
                                />
                                {errors.image && (
                                    <p className='error'>{errors.image}</p>
                                )}
                            </div> 
                            </div>
                            <div className="gen-palt">
                            {input.genres.map(e=>
                            <div className='divTemper'>
                            <p>{e}</p> 
                            <button className='botonX' onClick={()=>handleDelete(e)}>x</button>  
                            </div>
                            )}
                            {input.platforms.map(e=>
                            <div className='divTemper'>
                            <p>{e}</p> 
                            <button className='botonX' onClick={()=>handleDeletePlatform(e)}>x</button>  
                            </div>
                            )} 
                </div>                                                       
                        </div>
                        <div>
                        <button type='reset' onClick={handleReset}>Vaciar Formulario</button>
                        <button type='submit' >Agregar VideoGame</button>
                        </div>
                </form>
                                                     
                
                <div className="Back"><Link to= '/home'><button>Volver</button></Link></div>
            </div>
            
            
        </div>
    )

}
