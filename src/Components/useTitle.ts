import { useEffect } from "react";



export default function useTitle(url:string){
    useEffect(()=>{
        document.title = url;
    },[url])
}