import React from 'react'
import { useParams } from 'react-router'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import QuestionCard from '../../Components/QuestionCard/QuestionCard';

import "./SubPage.scss"
import useTitle from '../../Components/useTitle';
import AddQuestion from '../../Components/AddQuestion/AddQuestion';

export default function SubPage() {
    const { id } = useParams();
    useTitle(`${id?.toLocaleUpperCase()} / Bioinformatyka UJ`);

    const handleNext = ():void =>{

    }

    const handleAdd = ():void =>{

    }
  return (
    <div>
      <Header />
      <div className='SubData'>
        <h2 className='ID'>{id}</h2>
            <QuestionCard 
              answers={["a","b","c","d"]}
              comment='fajnie' 
              type='closed' 
              correct_answer='a' 
              question='a'
              id={1}
              user="Anonim"
              handleNext={handleNext}
              />
              <AddQuestion handleAdd={handleAdd}/>
      </div>
      <Footer />
    </div>
  )
}
