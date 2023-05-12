import React, {ReactElement, useState, useEffect, useCallback, useRef} from 'react'
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
  type:"closed" | "open" | "load" | "error"
}

export default function SubPage():ReactElement {
    const { id } = useParams();
    const timeout = useRef<any>(0);
    useTitle(`${id?.toLocaleUpperCase()} / Bioinformatyka UJ`);
    const timeout_id = useRef<string | undefined>(id);

    const [data,setData] = useState<Data | null>();

    const handleNext = useCallback(()=>{
      if(timeout_id.current !== id){
        clearTimeout(timeout.current);
        timeout.current = 0;
      }
      setData({
        type: "load",
        nick:"",
        id:2,
        question:"",
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
        comment:"",
        img:null,
        correct:""
      })
      //`https://server-alpha-ecru.vercel.app/get_question/${id}`
        axios.get(`https://server-alpha-ecru.vercel.app/get_question/${id}`,{timeout:5000}).then(res =>{
          if(res.data){
            if("ERROR" in res.data){
              setData({
                type: "error",
                nick:"",
                id:2,
                question:"",
                answer1:"",
                answer2:"",
                answer3:"",
                answer4:"",
                comment:"",
                img:null,
                correct:""
              })
              if(timeout.current === 0){
                timeout_id.current = id;
                timeout.current = setTimeout(()=>{handleNext(); timeout.current = 0;},2000)
              }
            }else{
              setData(res.data!);
            }
        }
        }).catch(err =>{
          console.log("Timeout reached, attempting again");
          setData({
            type: "error",
            nick:"",
            id:2,
            question:"",
            answer1:"",
            answer2:"",
            answer3:"",
            answer4:"",
            comment:"",
            img:null,
            correct:""
          })
          if(timeout.current === 0){
            timeout_id.current = id;
            timeout.current = setTimeout(()=>{handleNext(); timeout.current = 0;},2000)
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
          }).catch(err =>{
              console.log('server rejected adding question, attempting again')
              setTimeout(()=>{handleAdd(question,answers,nick,comment,type,correct_answer,file)},15000);
            }
          );
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
        }).catch(err =>{
          console.log('server rejected adding question, attempting again')
          setTimeout(()=>{handleAdd(question,answers,nick,comment,type,correct_answer,file)},15000);
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
