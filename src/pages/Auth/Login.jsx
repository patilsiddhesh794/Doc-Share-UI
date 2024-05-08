import React, {useState, useEffect, useContext} from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {auth, setAuth}= useAuth()

    //Handle Submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {status,data} = await axios.post('http://localhost:3000/auth', {email, password});
            if(status === 200 && data?.token){
                toast.success('Successfully Logged In');
                setAuth({
                    ...auth,
                    user: data?.name,
                    token: data?.token
            })
            localStorage.setItem("auth", JSON.stringify({user: data?.name, token: data?.token}));
                navigate('/');
            }else{
                toast.error('Invalid Credential or Email Not Verified');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Layout>
                <section className="vh-80">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                    <form className="card-body p-5 text-center" onSubmit={handleSubmit}>
                                        <h3 className="mb-5">Sign in</h3>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" placeholder='Email' className="form-control form-control-lg" value={email} required onChange={(e)=> setEmail(e.target.value)} />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" placeholder='Password' className="form-control form-control-lg" value={password} required onChange={(e)=> setPassword(e.target.value)} />
                                        </div>
                                        <div className="d-flex flex-column gap-3">
                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        <NavLink to='/forgot-password'>Forgot Password</NavLink>
                                        <h6>Don't have an account?  <NavLink to='/register'>Register</NavLink></h6>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}

export default Login
