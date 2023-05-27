import React, { ReactElement, useState} from 'react'
import axios from 'axios';
import "./admin.scss";

export default function Admin():ReactElement {

    const [logged,isLogged] = useState<boolean>(false);
    const [passId,setpassId] = useState<string>();
    const [pass,setPass] = useState<string>("");

    const handleLogin = () =>{
        //axios.post()
        const data={
          pass:pass
        }
        axios.post("https://serverbi.herokuapp.com/admin_login",data).then(res =>{
          if(res.data.auth === "yes"){
            setpassId(res.data.auth_id);
            isLogged(true);
          }
        })
    }

    const handleSync = () =>{
      const data={
        auth_id:passId
      };
      axios.post("https://serverbi.herokuapp.com/sync_data",data).then(res =>{
        console.log(res.data);
      })
    }

    const handleUpdate = () =>{
      const data={
        auth_id:passId
      };
      axios.post("https://serverbi.herokuapp.com/update_data",data).then(res =>{
        console.log(res.data);
      })
    }

  return (
    <div className='admin_page'>
        {!logged && <div className='login'>
            <h3>Password</h3>
            <input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} />
            <button onClick={handleLogin}>Login</button>
            </div>}
        {logged && <div className='panel'>
            <button onClick={handleUpdate}>Update Data</button>
            <button onClick={handleSync}>Sync Data</button>
          </div>}
    </div>
  )
}
