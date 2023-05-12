import React, { ReactElement} from 'react'
import { useNavigate } from "react-router-dom";
import './card.scss'

interface props{
    name:string,
    test_date:Date,
    to:string,
    img:[string,string]
}

export default function Card({name,test_date,to,img}:props):ReactElement {

    const navigate = useNavigate();

    const calc_days = ():string =>{
        let date:number = new Date().getTime();
        let distance:number = test_date.getTime() - date;
        let days = Math.floor(distance / (1000*60*60*24));
        return `${days}dni`;
    }

    const handleClick = ():void =>{
        navigate(`/subject/${to}`);
    }

  return (
    <div className='card' onClick={handleClick}>
        <h1>{name}</h1>
        <h2>Egzamin: {test_date.toLocaleDateString().replaceAll("/",".")}</h2>
        <h3>{name !== "Programowanie" ? name !== "GNU/LINUX" ? "Do egzaminu pozostało" : "Do projektu pozostało" : "Do Najbliższej BACY pzostało:"}</h3>
        <h4>{calc_days()}</h4>
        <div className='band'></div>
        <div className='Rotater'>
            <img className='img1' src={img[0]} alt="microscope" />
            <img className='img2' src={img[1]} alt="microscope" />
        </div>
    </div>
  )
}
