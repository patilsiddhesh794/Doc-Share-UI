import React,{useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'


const Spinner = () => {
    const [count, setcount] = useState(3);
    const navigate = useNavigate();
    

    useEffect(()=>{
        const interval = setInterval(()=>{
            setcount((prevValue)=> --prevValue)
        },1000)

        count === 0 && navigate(`/login`);
        return ()=>{
            clearInterval(interval);
        }
    },[count, navigate])


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"90vh"}}>
                <h1 className='Text-center'>Redirecting in {count} Seconds</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
