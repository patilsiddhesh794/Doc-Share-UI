import React, { useEffect } from 'react'
import {Radio} from 'antd'

const ShareModal = (props) => {
    useEffect(()=>{console.log(props)},[])
    const onsub = (e)=>{
        e.preventDefault();
        props.handleSubmit(props.fileId);
    }
    return (
        <>
            <form onSubmit={onsub}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
                </div>
                <Radio.Group onChange={(e)=> props.setRadio(e.target.value)}>
                  <div>
                    <Radio value={"read"}>Read</Radio>
                    <Radio value={"edit"}>Write</Radio>
                  </div>
              </Radio.Group>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </>
    )
}

export default ShareModal
