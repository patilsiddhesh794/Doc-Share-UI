import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios'
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function PrivateRoute(){
    const [ok, setOk] = useState(false)
    const {auth, setAuth} = useAuth()
    const navigate = useNavigate();

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await axios.get("http://localhost:3000/auth/user_auth")
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }

        if(auth?.token) authCheck()
        
    },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}