import React, { ReactElement, useEffect, useState} from 'react'
import './Show.scss'

interface props{
    handleClick: (id:number) => void,
    length:number,
    first:number,
    current:number,
    database:string
}

export default function Show({length,first,handleClick,current,database}:props):ReactElement {

    const [comp,setComp] = useState<Array<number>>();

    useEffect(()=>{
        const interval = setInterval(()=>{let compleated = localStorage.getItem(`compleated_${database}`);
        if(compleated){
            const arr = JSON.parse(compleated);
            setComp(arr);
        }},5000);
        return () =>{
            clearInterval(interval);
        }
    },[database])

    const renderDivs = ():Array<ReactElement> =>{
        const to_render:Array<ReactElement> = [];
        for(let x = 0; x < length; x++){
            to_render.push(<div key={x} className={`${comp?.find(y => y === x+first) ? "green" : ""} ${current === x+first ? "orange" : ""}`} onClick={() =>{handleClick(x+first)}}>{first+x}</div>)
        }
        return to_render;
    }

  return (
    <div className='rects'>{renderDivs()}</div>
  )
}
