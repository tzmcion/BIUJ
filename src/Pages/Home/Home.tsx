import React from 'react'
import School from '../../Assets/school.png'
import Header from '../../Components/Header/Header'
import Card from '../../Components/Card/Card'
import useTitle from '../../Components/useTitle'

import microscope from '../../Assets/exam.png'
import biochem from '../../Assets/biochem.gif'
import cells from '../../Assets/stem-cell.png'
import cells_gif from '../../Assets/division.gif'
import coding from '../../Assets/coding.gif'
import programming from '../../Assets/c-.png'
import calculus from '../../Assets/graph-calculus.gif'
import math_png from '../../Assets/math.png'
import dna_png from '../../Assets/dna.png'
import dna_gif from '../../Assets/dna.gif'
import linux from '../../Assets/linux.png'

import './Home.scss'
import "./media.scss"

export default function Home() {
    useTitle("Bioinformatyka UJ");

  return (
    <div style={{paddingBottom:"80px"}}>
        <Header/>
        <div className='Title'>
                <div className='Data'>
                    <h3>
                        Przygotuj się na egzaminy bo Cię zmiotą z planszy...
                    </h3>
                    <h4>
                        Rób testy, dodawaj pytania i zredukuj stres przed-egzaminowy
                    </h4>
                    <img src={School} alt="School img" />
                </div>
        </div>
        <div className='cards'>
            <Card name="Biochemia" test_date={new Date("Jun 29, 2023")} to='biochemia' img={[microscope,biochem]} send_name='biochemia'/>
            <Card name="Ilościowa BK" test_date={new Date("Jun 19, 2023")} to='ibk' img={[cells,cells_gif]} send_name='ibk'/>
            <Card name="Programowanie" test_date={new Date("Jun 3, 2023")} to='programowanie' img={[programming,coding]} send_name='programowanie'/>
            <Card name="Analiza" test_date={new Date("Jun 21, 2023")} to='analiza' img={[math_png,calculus]} send_name='analiza'/>
            <Card name="B Ewolucyjna" test_date={new Date("Jun 23, 2023")} to='ewolucyjna' img={[dna_png,dna_gif]} send_name='ewolucyjna'/>
            <Card name="GNU/LINUX" test_date={new Date("May 28, 2023")} to='gnu' img={[linux,linux]} send_name='gnu'/>
        </div>
        {/* <Footer/> */}
    </div>
  )
}
