import React, {ReactElement, useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import QuestionCard from '../../Components/QuestionCard/QuestionCard';

import "./SubPage.scss"
import useTitle from '../../Components/useTitle';
import AddQuestion from '../../Components/AddQuestion/AddQuestion';

interface Data{
  answers:string
  comment:string,
  correct:string,
  id:number,
  nick:string,
  question:string,
  type:"closed" | "open"
}

export default function SubPage():ReactElement {
    const { id } = useParams();
    useTitle(`${id?.toLocaleUpperCase()} / Bioinformatyka UJ`);

    const [data,setData] = useState<Data | null>();

    const handleNext = useCallback(()=>{
        axios.get(`http://localhost:8000/get_question/${id}`).then(res =>{
          if("ERROR" in res.data){
            setData(null);
          }else{
            setData(res.data!);
          }
        });
    },[id])


    const handleAdd = (question:string,answers:Array<string>,nick:string,comment:string,type:string,correct_answer:string):void =>{
        const data = {
          question:question,
          answers:JSON.stringify(answers),
          nick:nick,
          comment:comment,
          type:type,
          correct:correct_answer,
          table:id
        }
        axios.post("http://localhost:8000/add",data).then(res=>{
          console.log("data added!");
        });
    }

    useEffect(()=>{
      handleNext();
    },[handleNext])

  return (
    <div>
      <Header />
      <div className='SubData'>
        <h2 className='ID'>{id}</h2>
        {data &&
            <QuestionCard 
              answers={JSON.parse(data.answers)}
              comment={data.comment}
              type={data.type}
              correct_answer={data.correct} 
              question={data.question}
              id={data.id}
              user={data.nick}
              handleNext={handleNext}
              />
        }
              <AddQuestion handleAdd={handleAdd}/>
      </div>
      <Footer />
    </div>
  )
}
