import React from "react";
import "./Accueil.css"
import ChiffreMois from "../Component/DiagramCall/ChiffreMois.js"


export default function Accueil(){

    return(
        <div className="dFlex">
            <div className="cardContainer">

                <div className="carCard">
                    <a>
                        <ChiffreMois bar={false} className="diagram"></ChiffreMois>
                    </a>
                    {/* <img className="carImg" src="./img/208.webp"> */}
                </div>
        
            </div>
            <div className="cardContainer">

                <div className="carCard">
                    {/* <img className="carImg" src="./img/208.webp"> */}
                </div>
        
            </div>
            <div className="cardContainer">

                <div className="carCard">
                    {/* <img className="carImg" src="./img/208.webp"> */}
                </div>
        
            </div>
            <div className="cardContainer">

                <div className="carCard">
                    {/* <img className="carImg" src="./img/208.webp"> */}
                </div>
        
            </div>
        </div>
    )
}