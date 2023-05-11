import React, { ReactElement } from 'react'
import UJ from '../../Assets/UJ.png'
import { Link } from 'react-router-dom'
import "./Header.scss"

export default function Header() : ReactElement {
    const pages:Array<string> = ["biochemia","ibk","programowanie","analiza","ewolucyjna","GNU"];

    const renderLinks = () =>{
        return pages.map((page,index) => <Link to={`/subject/${page}`} className="Header_Link" key={index}>{page.toUpperCase()}</Link>);
    }

  return (
    <div className='Header'>
        <div className='Header_Title'>
            <img src={UJ} alt="UJ Logo" className='Header_Logo' />
            <Link to="/" className='Header_Title'>Bioinformatyka UJ</Link>
        </div>
        <div className='Header_Links'>
            {renderLinks()}
        </div>
    </div>
  )
}
