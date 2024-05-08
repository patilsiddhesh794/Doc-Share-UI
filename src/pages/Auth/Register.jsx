import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:3000/auth/signup", { email, name, password });
            if (data?.token) {
                toast.success('Registered Successfully. Please Verify To Login.');
                setVisible(true);
                setToken(data?.token);
                
            } else {
                toast.error(data?.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    //OTP Verification
    const verifyOtp = async()=>{
        try {
                const {status, data } = await axios.post('http://localhost:3000/auth/verify', { otp }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
    
                console.log(status , data);
                if (status === 200) {
                    toast.success(data.message);
                    localStorage.setItem('token', data.token);
                    navigate('/login');
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
                                        <h3 className="mb-5">Register</h3>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="text" placeholder='Name' className="form-control form-control-lg" value={name} required onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" placeholder='Email' className="form-control form-control-lg" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" placeholder='Password' className="form-control form-control-lg" value={password} required onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {visible && (<div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" placeholder='OTP' className="form-control form-control-lg" value={otp} required onChange={(e) => setOtp(e.target.value)} />
                                        </div>)}
                                        { (!visible) && <div className="d-flex flex-column gap-3">
                                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">Register</button>
                                        </div>}
                                    </form>
                                        { (visible) && <div className="d-flex flex-column gap-3">
                                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" onClick={verifyOtp}>Verify</button>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}

export default Register
