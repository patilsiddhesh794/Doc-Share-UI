import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useReset } from '../../context/resetPass.jsx'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { resetToken, setResetToken } = useReset();
    const navigate = useNavigate();

    //handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status, data } = await axios.post('http://localhost:3000/auth/reset-password', { email });
            if (status === 200) {
                setResetToken(data?.token);
                navigate('/verify-identity')
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
                                        <h3 className="mb-5">Reset Password</h3>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" placeholder='Email' value={email} className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
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

export default ForgotPassword
