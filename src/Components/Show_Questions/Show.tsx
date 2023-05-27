import React, { ReactElement, useEffect, useState} from 'react'
import './Show.scss'

interface props{
    handleClick: (id:number) => void,
    length:number,
    first:number
}

export default function Show({length,first,handleClick}:props):ReactElement {

    const [comp,setComp] = useState<Array<number>>();

    useEffect(()=>{
        const interval = setInterval(()=>{let compleated = localStorage.getItem("compleated");
        if(compleated){
            const arr = JSON.parse(compleated);
            setComp(arr);
        }},5000);
        return () =>{
            clearInterval(interval);
        }
    },[])

    const renderDivs = ():Array<ReactElement> =>{
        const to_render:Array<ReactElement> = [];
        for(let x = 0; x < length; x++){
            to_render.push(<div key={x} className={`${comp?.find(y => y === x+first) ? "green" : ""}`} onClick={() =>{handleClick(x+first)}}>{first+x}</div>)
        }
        return to_render;
    }

  return (
    <div className='rects'>{renderDivs()}</div>
  )
}
