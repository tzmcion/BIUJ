import React, { ReactElement, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import "./QuestionCard.scss"

interface QuestionProps{
    type: "closed" | "open",
    question:string
    answers: [string,string,string,string]
    correct_answer:string
    comment:string
    id:number
    user:string
    handleNext: () => void
}

export default function QuestionCard({type,answers,correct_answer,comment,question,id,user,handleNext}:QuestionProps):ReactElement {

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
            return <div key={index} className='Answer'>
                    <input type='radio' value={answer} disabled={isChecked} {...register("answer")} />
                    <h4 style={{backgroundColor: (isChecked && answer === correct_answer) ? "green" : (isChecked && answer === form.watch()['answer']) ? "yellow" : 'transparent'}} key={index}>{index}. {answer}</h4>
            </div>
        })
    }

    const handleCheck = ():void =>{
        setIsChecked(true);
    }

    useEffect(()=>{
        setIsChecked(false);
    },[question])

  return (
    <div className='QuestionCard'>
        <h5>Dodane przez: <span className={`${user === "Admin" ? "red" : "green"}`}>{user}</span></h5>
        <h4 className='Question'>|ID:{id}|  {question}</h4>
        {type === 'closed' && <div className='Answers'>
            {renderAnswers()}
        </div>}
        {isChecked && comment.length > 0 && <h3 className='Comment'>Komentarz: {comment}</h3>}
        <div className='For_Buttons'></div>
        <div className='Check_Answer Button' onClick={handleCheck}><p>Check Answer</p></div>
        <div className='Next_Question Button' onClick={handleNext}><p>Next Question</p></div>
        <div className='Report_Question Button' title='Jeżeli uważasz, 
        że pytanie jest niepoprawne, zgłoś je. Pytanie zostaną usunięte może :)'>
            <p>Report</p>
        </div>
    </div>
  )
}
