import React, { ReactElement, useState } from 'react'
import {useForm} from 'react-hook-form'
import "./AddQuestion.scss"
import "./media.scss"

import arrow from '../../Assets/right-arrow.png'

interface AddProps{
    handleAdd:(question:string,answers:Array<string>,nick:string,comment:string,type:string,correct_answer:string,file:File|null|undefined)=>void
}

export default function AddQuestion({handleAdd}:AddProps):ReactElement {

    const [userName,setUserName] = useState<string>("Anonim");
    const [question,setQuestion] = useState<string>("");
    const [answers,setAnswers] = useState<Array<string>>(["","","",""]);
    const [comment,setComment] = useState<string>("");
    const [isOpen,setISOpen] = useState<boolean>(true);
    const [selectedFile,setSelectedFile] = useState<File|null>(null);

    const clearAll = () =>{
        setQuestion("");
        setAnswers(["","","",""]);
        setComment("");
        setSelectedFile(null);
        setISOpen(true);
    }

    const handleImageChange = (file:FileList | null):void =>{
        if(file){
            if(file[0]){
                console.log(file[0].size);
                if(file[0].size < 3 * Math.pow(10,5)){
                    setSelectedFile(file[0]);
                }else{
                    alert("Image is to big... IT won't be uploaded...");
                }
            }
        }
    }

    const form = useForm({
        defaultValues:{
            type:"closed",
            right_answer:-1
        },
        mode:"onChange"
    })
    const {register} = form;
    const handleChange = (event:any):void =>{
        let new_answers:Array<string> = [];
        switch(event.target.name){
            case "username":
                setUserName(event.target.value.replace('\'',' '));
                break;
            case "question":
                setQuestion(event.target.value.replace('\'',' '));
                break;
            case "answer1":
                answers.map((ans,index) =>{
                    if(index !== 0){
                    new_answers.push(ans);}
                    else{
                    new_answers.push(event.target.value.replace('\'',' '));
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
                    new_answers.push(event.target.value.replace('\'',' '));
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
                    new_answers.push(event.target.value.replace('\'',' '));
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
                    new_answers.push(event.target.value.replace('\'',' '));
                    }
                    return null;
                })
                setAnswers(new_answers);
                break;
            case "comment":
                setComment(event.target.value.replace('\'',' '));
                break;
            default:
                break;
        }
    }

    const onAdd = ():void => {
        if(form.watch()['right_answer']>=0 || form.watch()["type"] !== "closed"){
            const right_answer = answers[form.watch()['right_answer']-1];
            if(question.length > 0){
                if(form.watch()["type"] === "closed"){
                    if(answers[0].length > 0 && answers[1].length > 0 && answers[2].length > 0 && answers[3].length > 0){
                        if(answers[0].length <255 && answers[1].length <255 && answers[2].length <255 && answers[3].length <255){
                        handleAdd(question,answers,userName,comment,form.watch()['type'],right_answer,selectedFile);
                        clearAll();
                        }else{
                            alert("ERROR:: varchar(255):: Pojedyńcza odpowiedź nie może mieć więcej niż 255 znaków");
                        }
                    }else{
                        alert("Nie wszystkie odpowiedzi są uzupełnione...");
                    }
                }else{
                    handleAdd(question,answers,userName,comment,form.watch()['type'],right_answer,selectedFile);
                    clearAll();

                    //Feedback
                }
            }else{
                alert("Zapomniałeś wpisać pytanie...")
            }
        }else{
            alert("Zapomniałeś zaznaczyc odpoweidź ...")
        }
    }

  return (
    <div className={`AddQuestion ${isOpen ? "AQclosed" : ""}`}>
        <h2>DODAJ PYTANIE</h2>
        <div className='two '>
            <h4>Twój nick z BaCy: </h4>
            <input placeholder='USER_NAME' value={userName} name="username" onChange={handleChange}/>
        </div>
        <div className='radio'>
            <h4>Typ Pytania: </h4>
            <input type="radio" value="closed" {...register("type")} />
            <h4>Closed</h4>
            <input type="radio" value="open" {...register("type")} />
            <h4>Open</h4>
        </div>
        <div className="two">
            <h4>Treść Pytania:</h4>
            <textarea value={question} onChange={handleChange} name="question"/>
        </div>
        <div className="two">
            <input type="radio" {...register("right_answer")} value={1} disabled={form.watch()["type"] === "open"}/>
            <h4>Odpowiedź nr1:</h4>
            <textarea value={answers[0]} onChange={handleChange} name="answer1" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <input type="radio" {...register("right_answer")} value={2} disabled={form.watch()["type"] === "open"}/>
            <h4>Odpowiedź nr2:</h4>
            <textarea value={answers[1]} onChange={handleChange} name="answer2" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <input type="radio" {...register("right_answer")} value={3} disabled={form.watch()["type"] === "open"}/>
            <h4>Odpowiedź nr3:</h4>
            <textarea value={answers[2]} onChange={handleChange} name="answer3" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <input type="radio" {...register("right_answer")} value={4} disabled={form.watch()["type"] === "open"}/>
            <h4>Odpowiedź nr4:</h4>
            <textarea value={answers[3]} onChange={handleChange} name="answer4" disabled={form.watch()["type"] === "open"}/>
        </div>
        <div className="two">
            <h4>Komentarz -- napisz coś co tłumaczy to pytanie: </h4>
            <textarea value={comment} onChange={handleChange} name="comment"/>
        </div>
        <div className="two">
            <h4>Dodaj zdjęcie (nieduże rozmiary i TYLKO gdy trzeba) </h4>
            <input type='file' onChange={e => handleImageChange(e.target.files)} />
        </div>
        <div className='Button_Add' onClick={onAdd}><p>Dodaj</p></div>
        <img src={arrow} alt="arrow_pen" className={`Arrow_Open ${!isOpen ? "op_ar" : "cl_ar"}`} onClick={()=>{setISOpen(!isOpen)}} />
    </div>
  )
}
