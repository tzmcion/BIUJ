import React, { ReactElement, useState } from 'react'
import {useForm} from 'react-hook-form'
import "./AddQuestion.scss"

interface AddProps{
    handleAdd:()=>void
}

export default function AddQuestion({handleAdd}:AddProps):ReactElement {

    const [userName,setUserName] = useState<string>("Anonim");
    const [question,setQuestion] = useState<string>("");
    const [answers,setAnswers] = useState<Array<string>>(["","","",""]);
    const [comment,setComment] = useState<string>("");

    const form = useForm({
        defaultValues:{
            type:"closed"
        },
        mode:"onChange"
    })
    const {register} = form;
    const handleChange = (event:any):void =>{
        let new_answers:Array<string> = [];
        switch(event.target.name){
            case "username":
                setUserName(event.target.value);
                break;
            case "question":
                setQuestion(event.target.value);
                break;
            case "answer1":
                answers.map((ans,index) =>{
                    if(index !== 0){
                    new_answers.push(ans);}
                    else{
                    new_answers.push(event.target.value);
                    }
                    return null;
                })
                setAnswers(new_answers);
                break;
            case "answer2":
                answers.map((ans,index) =>{
                    if(index !== 1){
                    new_answers.push(ans);}
                    else{
                    new_answers.push(event.target.value);
                    }
                    return null;
                })
                setAnswers(new_answers);
                break;
            case "answer3":
                answers.map((ans,index) =>{
                    if(index !== 2){
                    new_answers.push(ans);}
                    else{
                    new_answers.push(event.target.value);
                    }
                    return null;
                })
                setAnswers(new_answers);
                break;
            case "answer4":
                answers.map((ans,index) =>{
                    if(index !== 3){
                    new_answers.push(ans);}
                    else{
                    new_answers.push(event.target.value);
                    }
                    return null;
                })
                setAnswers(new_answers);
                break;
            case "comment":
                setComment(event.target.value);
                break;
            default:
                break;
        }
    }

  return (
    <div className='AddQuestion'>
        <h2>ADD QUESTION</h2>
        <div className='two '>
            <h4>User Name: </h4>
            <input placeholder='USER_NAME' value={userName} name="username" onChange={handleChange}/>
        </div>
        <div className='radio'>
            <h4>Question Type: </h4>
            <input type="radio" value="closed" {...register("type")} />
            <h4>Closed</h4>
            <input type="radio" value="open" {...register("type")} />
            <h4>Open</h4>
        </div>
        <div className="two">
            <h4>Question:</h4>
            <textarea value={question} onChange={handleChange} name="question"/>
        </div>
        <div className="two">
            <h4>Answer.1:</h4>
            <textarea value={answers[0]} onChange={handleChange} name="answer1" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <h4>Answer.2:</h4>
            <textarea value={answers[1]} onChange={handleChange} name="answer2" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <h4>Answer.3:</h4>
            <textarea value={answers[2]} onChange={handleChange} name="answer3" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <h4>Answer.4:</h4>
            <textarea value={answers[3]} onChange={handleChange} name="answer4" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <h4>Comment: </h4>
            <textarea value={comment} onChange={handleChange} name="comment"/>
        </div>
        <div className='Button_Add' onClick={handleAdd}><p>Add</p></div>
    </div>
  )
}
