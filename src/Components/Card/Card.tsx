import React, { ReactElement,useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './card.scss'

interface props{
    name:string,
    test_date:Date,
    to:string,
    img:[string,string],
    send_name:string
}

export default function Card({name,test_date,to,img,send_name}:props):ReactElement {

    const navigate = useNavigate();
    const [base,setBase] = useState<number>(0);

    const calc_days = ():string =>{
        let date:number = new Date().getTime();
        let distance:number = test_date.getTime() - date;
        let days = Math.floor(distance / (1000*60*60*24));
        return `${days}dni`;
    }

    useEffect(()=>{
        axios.get(`https://serverbi.herokuapp.com/quantity/${send_name}`).then(res =>{
            if("quantity" in res.data){
                setBase(res.data.quantity);
            }else{
                setBase(0);
            }
        })
    },[name,send_name])

    const handleClick = ():void =>{
        navigate(`/subject/${to}`);
    }

  return (
    <div className='card' onClick={handleClick}>
        <h1>{name}</h1>
        <h2>Egzamin: {test_date.toLocaleDateString().replaceAll("/",".")}</h2>
        <h3>{name !== "Programowanie" ? name !== "GNU/LINUX" ? "Do egzaminu pozostało" : "Do projektu pozostało" : "Do Najbliższej BACY pzostało:"}</h3>
        <h4>{calc_days()}</h4>
        <h5>Baza Pytań: {base}</h5>
        <div className='band'></div>
        <div className='Rotater'>
            <img className='img1' src={img[0]} alt="microscope" />
            <img className='img2' src={img[1]} alt="microscope" />
        </div>
    </div>
  )
}
