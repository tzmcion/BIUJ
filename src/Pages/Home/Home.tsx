import React from 'react'
import School from '../../Assets/school.png'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
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

export default function Home() {
    useTitle("Bioinformatyka UJ");

  return (
    <div>
        <Header/>
        <div className='Title'>
                <div className='Data'>
                    <h3>
                        Przygotuj się na egzaminy bo Cię zmiotą z planszy...
                    </h3>
                    <h4>
                        Rób testy, dodawaj pytania i zredukuj stres przed-egzaminowy
                    </h4>
                </div>
                <img src={School} alt="School img" />
        </div>
        <div className='cards'>
            <Card name="Biochemia" test_date={new Date("Jun 22, 2023")} to='biochemia' img={[microscope,biochem]}/>
            <Card name="Ilościowa BK" test_date={new Date("Jun 19, 2023")} to='ibk' img={[cells,cells_gif]}/>
            <Card name="Programowanie" test_date={new Date("May 19, 2023")} to='programowanie' img={[programming,coding]}/>
            <Card name="Analiza" test_date={new Date("Jun 21, 2023")} to='analiza' img={[math_png,calculus]}/>
            <Card name="B Ewolucyjna" test_date={new Date("Jun 23, 2023")} to='ewolucyjna' img={[dna_png,dna_gif]}/>
            <Card name="GNU/LINUX" test_date={new Date("Mar 25, 2006")} to='gnu' img={[linux,linux]}/>
        </div>
        <Footer/>
    </div>
  )
}
