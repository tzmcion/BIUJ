import React, { ReactElement, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import "./QuestionCard.scss"
import "./media.scss"

import julia from '../../Assets/julia-name.gif'
import error from '../../Assets/Error.gif'

interface QuestionProps{
    type: "closed" | "open" | "load" | "error",
    question:string
    answers: [string,string,string,string]
    correct_answer:string
    comment:string
    id:number
    user:string
    database:string
    file:string|null
    handleNext: () => void
    handleRandom: () => void
}

export default function QuestionCard({type,answers,correct_answer,comment,question,id,user,handleNext,database,file,handleRandom}:QuestionProps):ReactElement {

    const form = useForm({
        defaultValues:{
            "answer": answers[0]
        },
        mode: "onChange"
    })
    const { register } = form;
    const [isChecked,setIsChecked] = useState<boolean>(false);
    

    const renderAnswers = ():any =>{
        return answers.map((answer,index) => {
            return <div key={index} className={`Answer ${isChecked === false ? "Answer_anim" : ""} ${isChecked && answer === correct_answer ? "ans_green" : isChecked && answer === form.watch()['answer'] ? "ans_yell" : ""}`}  onClick={()=>{isChecked === false && form.setValue("answer",answer);handleCheck()}}>
                    <input type='radio' value={answer} disabled={isChecked} {...register("answer")} />
                    <h4 key={index}>{answer}</h4>
            </div>
        })
    }

    const handleCheck = ():void =>{
        let compleated = localStorage.getItem("compleated");
        if(compleated){
            const arr = JSON.parse(compleated);
            if(arr){
                if(form.watch()['answer'] === correct_answer || type==='open'){
                    arr.push(id);
                }
            }
            localStorage.setItem("compleated",JSON.stringify(arr));
        }else{
            localStorage.setItem("compleated",JSON.stringify([]));
        }
        setIsChecked(true);
    }

    useEffect(()=>{
        setIsChecked(false);
        if(database === 'programowanie'){

        }
    },[question,database])

    const renderComment = () =>{
        if(database === 'programowanie'){
            const parts = comment.split('```');
            return(
            <div className='Comment'>
                <h3>{parts[0]}</h3>
                <SyntaxHighlighter language='cpp' style={dark}>
                    {parts[1]}
                </SyntaxHighlighter>
            </div>
            )
        }
        else{
            return <h3 className='Comment'>Komentarz: <pre>{comment}</pre></h3>
        }
    }

  return (
    <div className='QuestionCard'>
        {type === "load" && <div className='Load'>
            <img src={julia} alt="julia"/>
            <h5>Ładowanie...</h5>
        </div>}
        {type === "error" && <div className='Error'>
            <img src={error} alt="error" />
            <h5>Wewnętrzny błąd serwera...</h5>
            <h4>Najprawdopodobniej wyczerpałeś/aś pulę pytań</h4>
            <h4>Nic na to nie poradzimy :c. Może inne pytanie lub refresh page?</h4> 
        </div>}
        {type !== "load" && type!=="error" && <><h5>Dodane przez: <span className={`${user === "@GUAdmin" ? "red" : "green"}`}>{user === "@GUAdmin" ? "Admin" : user}</span></h5>
        <h4 className='Question'>|ID:{id}|  {question}</h4>
        <div className='breakpoint'></div>
        {file && file!=="null" && <img className="image" src={file} alt="logo..." />}
        {type === 'closed' && <div className='Answers'>
            {renderAnswers()}
        </div>}
        {isChecked && comment.length > 0 && renderComment()}
        <div className='For_Buttons'></div>
        <div className="button Check" onClick={handleCheck}>Sprawdź</div>
        <div className="button Next" onClick={handleNext}>Następne</div>
        <div className="button Rand" onClick={handleRandom}>Losowe</div></>}
    </div>
  )
}
