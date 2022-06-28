import React from "react";
import './Paginado.css';

export default function Paginado ({gamesPerPage, allGames, paginado}){
    const pageNumber = []

    for(let i=1; i<=Math.ceil(allGames/gamesPerPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
            <li><a>«</a></li>
                {pageNumber && 
                pageNumber.map(number =>(
                    <li key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                    
                ))}
            <li><a>»</a></li>
            </ul>
        </nav>
    )
}