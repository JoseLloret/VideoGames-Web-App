import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import{getGenres, postGame, getPlatforms} from '../actions'
import './GameCreate.css'
import ImgNotFound from '../Background-image/ImgNotFound.jpg'

function validate(input){
    let errors ={};
    if(!input.name){
        errors.name = 'Falta ingresar un Nombre'
    } else if(!input.description){
            errors.description = 'Falta ingresar una Descripcion'
    }else if(!input.released){
        errors.released = 'Falta ingresar fecha de lanzamiento'
    }else if(input.image && input.image.slice(0,7) !== 'https://'){
        errors.image = 'Ingrese una URL valida'
    }else if(!input.rating){
        errors.rating = 'Falta ingresar un Rating'
    }else if(input.rating < 0 || input.rating > 5){
        errors.rating = 'El valor debe ser entre 0 y 5'
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
        if(!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        } else return alert('Esa genero ya fue seleccionado')      
    }
    function handleSelectPlatform(e){
            if(!input.platforms.includes(e.target.value)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            } else return alert('Esa plataforma ya fue seleccionada')                
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!input.name) return alert('Falta ingresar nombre')
        if(!input.description) return alert('Falta ingresar descripcion')
        if(!input.released) return alert('Falta ingresar lanzamiento')
        if(!input.rating) return alert('Falta ingresar rating')
        if(input.rating < 0 || input.rating > 5) return alert('El valor debe ser entre 0 y 5')
        if(input.image && input.image.slice(0,8) !== 'https://') return alert('Ingrese una URL valida')
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
            <div className="container-GC">
                <div className="Titulo-GC">< h1 className="Title">AGREGA TU JUEGO</h1></div>
                <div className="Conteiner2">
                    <div className="card-GC">
                        <img className="img-card" src={input.image} alt='img not found'/>
                        <h3 className="tit-card">{input.name}</h3>
                        <h4 className="info-card">Descripcion:</h4>
                        <h5 className="info-card">{input.description}</h5>
                        <h4 className="info-card">Lanzamiento:</h4>
                        <h5 className="info-card">{input.released}</h5>
                        <h4 className="info-card">Rating:</h4>
                        <h5 className="info-card">{input.rating}</h5>
                        <h4 className="info-card">Generos:</h4>
                        <h5 className="info-card">{input.genres}</h5>
                        <h4 className="info-card">Plataforma:</h4>
                        <h5 className="info-card">{input.platforms + ' '}</h5>
                    </div>           
                    <div className="Formulario">
                        <form onSubmit={(e)=> handleSubmit(e)}>
                                <div className="form">
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
                                    {errors.rating && (
                                        <p className='error'>{errors.rating}</p>
                                    )}
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
                                 
                            <div className="Botones-GC">
                                <button className="Vaciar" type='reset' onClick={handleReset}>Vaciar Formulario</button>
                                <button className="Agregar" type='submit' >Agregar VideoGame</button>
                            </div>
                        </form>
                        <div className="plat-gen">
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
                </div>                                                     
                <div className="Volver-GC"><Link to= '/home'><button>Volver</button></Link></div>
                
            </div>
            
            
        </div>
    )

}
