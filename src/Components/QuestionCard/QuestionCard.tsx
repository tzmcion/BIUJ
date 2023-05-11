import React, { ReactElement, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import "./QuestionCard.scss"
import "./media.scss"

interface QuestionProps{
    type: "closed" | "open",
    question:string
    answers: [string,string,string,string]
    correct_answer:string
    comment:string
    id:number
    user:string
    database:string
    file:string|null
    handleNext: () => void
}

export default function QuestionCard({type,answers,correct_answer,comment,question,id,user,handleNext,database,file}:QuestionProps):ReactElement {

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
            return <h3 className='Comment'>Komentarz: {comment}</h3>
        }
    }

  return (
    <div className='QuestionCard'>
        <h5>Dodane przez: <span className={`${user === "@GUAdmin" ? "red" : "green"}`}>{user === "@GUAdmin" ? "Admin" : user}</span></h5>
        <h4 className='Question'>|ID:{id}|  {question}</h4>
        {file && file!=="null" && <img className="image" src={file} alt="logo..." />}
        {type === 'closed' && <div className='Answers'>
            {renderAnswers()}
        </div>}
        {isChecked && comment.length > 0 && renderComment()}
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
