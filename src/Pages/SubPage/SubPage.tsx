import React, {ReactElement, useState, useEffect, useCallback, useRef} from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import Header from '../../Components/Header/Header';
import QuestionCard from '../../Components/QuestionCard/QuestionCard';
import Show from '../../Components/Show_Questions/Show';

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
    const [quest_id,set_quest_id] = useState<number>(1);
    const [first_id,set_first_id] = useState<number>(0);
    const [reset,setReset] = useState<boolean>(false);
    const [max,setMax] = useState<number>(0);

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
      //`https://serverbi.herokuapp.com/get_question/${id}/0`
        axios.get(`https://serverbi.herokuapp.com/get_question/${id}/${quest_id}`,{timeout:5000}).then(res =>{
          if(res.data){
            if("ERROR" in res.data || "bad_id" in  res.data){
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
              console.log(`https://serverbi.herokuapp.com/get_question/${id}/${quest_id}`)
            }else{
              set_quest_id(res.data.id);
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
        });
    },[id,quest_id])




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
          axios.defaults.headers.post['Content-Type'] ='application/json';
          axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
          axios.post("https://serverbi.herokuapp.com/add",data).then(res=>{
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
        axios.defaults.headers.post['Content-Type'] ='application/json';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post("https://serverbi.herokuapp.com/add",data,{}).then(res=>{
          console.log("data added!");
        }).catch(err =>{
          console.log('server rejected adding question, attempting again');
          console.log('your data: ');
          console.log(JSON.stringify(data));
          setTimeout(()=>{handleAdd(question,answers,nick,comment,type,correct_answer,file)},15000);
        });
      }
    }

    useEffect(()=>{
      axios.get(`https://serverbi.herokuapp.com/quantity/${id!.toLowerCase()}`).then(res =>{
        if('quantity' in res.data && 'f_id' in res.data){
          set_quest_id(res.data.f_id);
          setMax(res.data.quantity);
          set_first_id(res.data.f_id);
        }else{
          console.log('bad_id');
          console.log(`https://serverbi.herokuapp.com/quantity/${id!.toLowerCase()}`)
        }
      })
    },[id])

    useEffect(()=>{
      if(max !== 0){
        handleNext();
      }
    },[max,handleNext,reset]);

    const handleRandom = ():void =>{
      set_quest_id(0);
      setReset(true);
    }

    const handle_but_next = ():void =>{
      set_quest_id(curr => curr +1);
      setReset(true);
    }

    const handle_swap = (id:number):void =>{
      set_quest_id(id);
    }

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
              handleNext={handle_but_next}
              handleRandom={handleRandom}
              />
        }
        {data && id && <Show  first={first_id} length={max} current={data.id} database={id} handleClick={handle_swap}/>}
        <button className='RESET' onClick={()=>{localStorage.setItem(`compleated_${id}`,JSON.stringify([]))}}>RESET PROGRESS</button>
              <AddQuestion handleAdd={handleAdd}/>
      </div>
    </div>
  )
}
