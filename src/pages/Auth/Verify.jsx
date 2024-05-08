import React, { useState } from 'react'
import { useReset } from '../../context/resetPass.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout.jsx';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const {resetToken, setResetToken} = useReset();

    //Handle Submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {status, data} = await axios.post('http://localhost:3000/auth/reset_password/verify',{otp: parseInt(otp), password, cpassword, token: resetToken});
            if(status === 201){
                toast.success('Password Reset Successfully');
                setResetToken("");
                navigate('/login');
            }else{
                toast.error('Some Error Occured');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Layout>
        
      <section className="vh-80">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                    <form className="card-body p-5 text-center" onSubmit={handleSubmit}>
                                        <h3 className="mb-5">Verify Identity</h3>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="number" placeholder='OTP' value={otp} className="form-control form-control-lg" onChange={(e)=> setOtp(e.target.value)} />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" placeholder='Password' value={password} className="form-control form-control-lg" onChange={(e)=> setPassword(e.target.value)} />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" placeholder='Confirm Password' value={cpassword} className="form-control form-control-lg" onChange={(e)=> setCpassword(e.target.value)} />
                                        </div>

                                        <div className="d-flex flex-column gap-3">
                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    </Layout>
  )
}

export default Verify
