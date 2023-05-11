import React, {ReactElement, useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import Header from '../../Components/Header/Header';
import QuestionCard from '../../Components/QuestionCard/QuestionCard';

import "./SubPage.scss"
import "./media.scss"
import useTitle from '../../Components/useTitle';
import AddQuestion from '../../Components/AddQuestion/AddQuestion';

interface Data{
  answer1:string,
  answer2:string,
  answer3:string,
  answer4:string,
  comment:string,
  correct:string,
  id:number,
  nick:string,
  question:string,
  img:string|null
  type:"closed" | "open"
}

export default function SubPage():ReactElement {
    const { id } = useParams();
    useTitle(`${id?.toLocaleUpperCase()} / Bioinformatyka UJ`);

    const [data,setData] = useState<Data | null>();

    const handleNext = useCallback(()=>{
        axios.get(`https://server-alpha-ecru.vercel.app/get_question/${id}`).then(res =>{
          if(res.data){
            if("ERROR" in res.data){
              setData(null);
            }else{
              setData(res.data!);
            }
        }
        });
    },[id])


    const handleAdd = (question:string,answers:Array<string>,nick:string,comment:string,type:string,correct_answer:string,file:File | null | undefined):void =>{
      if(file !== undefined && file !== null){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
          const data = {
            question:question,
            answers:JSON.stringify(answers),
            nick:nick,
            comment:comment,
            type:type,
            correct:correct_answer,
            table:id,
            file:reader.result
          }
          axios.post("https://server-alpha-ecru.vercel.app/add",data).then(res=>{
            console.log("data added!");
          });
        }
      }else{
        const data = {
          question:question,
          answers:JSON.stringify(answers),
          nick:nick,
          comment:comment,
          type:type,
          correct:correct_answer,
          table:id,
          file:null
        }
        axios.post("https://server-alpha-ecru.vercel.app/add",data).then(res=>{
          console.log("data added!");
        });
      }
    }

    useEffect(()=>{
      handleNext();
    },[handleNext])

  return (
    <div>
      <Header />
      <div className='SubData'>
        <h2 className='ID'>{id}</h2>
        {data && id &&
            <QuestionCard 
              answers={[data.answer1,data.answer2,data.answer3,data.answer4]}
              comment={data.comment}
              type={data.type}
              correct_answer={data.correct} 
              question={data.question}
              id={data.id}
              user={data.nick}
              database={id}
              file={data.img}
              handleNext={handleNext}
              />
        }
              <AddQuestion handleAdd={handleAdd}/>
      </div>
    </div>
  )
}
