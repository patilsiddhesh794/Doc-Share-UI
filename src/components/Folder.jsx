import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import ShareModal from '../pages/Form/ShareModal';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Folder = () => {
    const params = useParams();
    const [folders, setFolders] = useState([]);
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("")
    const { fid } = params;
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [fileId, setFileId] = useState("");
    const [radio, setRadio] = useState("");
    const [fileData, setFileData] = useState("");
    


    //Get Folders
    const getFolders = async () => {
        try {
            const { status, data } = await axios.get(`http://localhost:3000/open?folderId=${fid}`);
            if (status === 200) {
                setFolders(data?.subfolders);
                setFiles(data?.files);
            } else {
                toast.error('Something Went Wrong While Opening');
            }

        } catch (error) {
            console.log(error);
        }
    }

    //Create Folder
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const { status, data } = await axios.post('http://localhost:3000/createFolder', { folderId: fid, name: name });
            if (status === 200) {
                toast.success('Folder Created Successfully');
                getFolders();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFolders();
    }, [fid])

    //Upoad File
    const handleUpload = async(e)=>{
        e.preventDefault();
        try {
            const fdata = new FormData();
            fdata.append('file', file);
            fdata.append('folderId', fid);
            console.log(file)
            const {status, data} = await axios.post('http://localhost:3000/uploadFile', fdata);
            if(status === 201){
                toast.success(data?.success);
                setFile("");
                getFolders();
            }else{
                toast.error('Error while uploading file');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

     //Handle Share Function
     const handleShare = async (fileId) => {
        try {
            const { status, data } = await axios.post('http://localhost:3000/share', { email, fileId, level: radio });
            console.log(data)
            if (status === 200) {
                setVisible(false);
                toast.success("Shared Successfully");
                setEmail("");
                setRadio("");
                setFileId("");
            }

        } catch (error) {
            console.log(error);
        }
    }


    //Open File
    const handleOpen = async (fileId) => {
        try {
            const { data } = await axios.get(`http://localhost:3000/loadfile?fileId=${fileId}`, { responseType: 'blob' });
            if (data) {
                setFileData(data);
                // const file = new Blob([data], { type: headers['content-type'] });
                const uri = URL.createObjectURL(fileData)
                window.open(uri, '_blank')
                setFileData("");
            } else {
                console.log("Error");
            }

        } catch (error) {
            console.log(error);
        }
    }

    //Handle Delete
    const handleDelete = async(folderId)=>{
        try {
            console.log(folderId);
            const {status, data} = await axios.delete('http://localhost:3000/deleteFolder', {data:{folderId}});
            if(status === 200){
                getFolders();
                toast.success(data?.message);
            }else{
                toast.error(data?.message);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    //Handle File Delete
    const handleFileDelete = async(fileId, parentFolder) =>{
        try {
            const {status, data} = await axios.delete('http://localhost:3000/delete', {data:{fileId, parentFolder}});
            if(data.result){
                getFolders();
                toast.success("File Deleted Successfully");
            }else{
                toast.error("Error Occurred");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Layout>
                <div className="container-fluid row mt-4">
                    <div className="text-center">
                        <form className="d-flex justify-content-center" role="search" onClick={handleCreate}>
                            <input className="form-control me-2 w-50" type="text" placeholder="New Folder Name" aria-label="New Folder" value={name} onChange={(e) => setName(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Create Folder</button>
                        </form>
                        <div className="m-4 d-flex gap-2 justify-content-center">
                        <label className='btn btn-outline-primary'>
                            {file ? file.name : "Upload File"}
                            <input type="file" hidden name='file' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <button className='btn btn-outline-secondary' onClick={handleUpload}>Upload</button>
                        </div>
                    </div>
                    <div className="container-fluid row mt-3">
                        <div className="col-md-4">
                            <h1>Folders</h1>
                            <div className="folders d-flex flex-wrap gap-4 mt-4">
                            {folders.length < 0 && <h3 className='text-center'>No Folders To Display</h3>}
                                {folders.map((f) => (
                                    <div key={f.folderId} className="position-relative">
                                    <Dropdown className="text-right">
                                        <Dropdown.Toggle variant="link" id={`dropdown-${f.folderId}`} className="p-0 dropdown-toggle-hidden">
                                            <Link to={`/folder/${f.folderId}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stop-color="#fac017"></stop>
                                                    <stop offset="90.9%" stop-color="#e1ab2d"></stop>
                                                </linearGradient>
                                                <path fill="url(#gradient)" d="M44.5,41h-41C2.119,41,1,39.881,1,38.5v-31C1,6.119,2.119,5,3.5,5h11.597	c1.519,0,2.955,0.69,3.904,1.877L21.5,10h23c1.381,0,2.5,1.119,2.5,2.5v26C47,39.881,45.881,41,44.5,41z"></path>
                                                <path fill="url(#gradient)" d="M2,25h20V11H4c-1.105,0-2,0.895-2,2V25z"></path>
                                                <path fill="url(#gradient)" d="M2,26h20V12H4c-1.105,0-2,0.895-2,2V26z"></path>
                                                <path fill="url(#gradient)" d="M1,37.875V38.5C1,39.881,2.119,41,3.5,41h41c1.381,0,2.5-1.119,2.5-2.5v-0.625H1z"></path>
                                                <path fill="url(#gradient)" d="M44.5,11h-23l-1.237,0.824C19.114,12.591,17.763,13,16.381,13H3.5C2.119,13,1,14.119,1,15.5	v22C1,38.881,2.119,40,3.5,40h41c1.381,0,2.5-1.119,2.5-2.5v-24C47,12.119,45.881,11,44.5,11z"></path>
                                                <path fill="url(#gradient)" d="M44.5,40h-41C2.119,40,1,38.881,1,37.5v-21C1,15.119,2.119,14,3.5,14h13.256	c1.382,0,2.733-0.409,3.883-1.176L21.875,12H44.5c1.381,0,2.5,1.119,2.5,2.5v23C47,38.881,45.881,40,44.5,40z"></path>
                                            </svg>
                                            </Link>
                                        </Dropdown.Toggle>
                                
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleDelete(f.folderId)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <p className='text-center'>{f.name}</p>
                                </div>
                                ))}
                            </div>

                        </div>
                        <div className="col-md-8">
                            <h1>Files</h1>
                            {files.length < 1 ? <h3 className='mt-5'>No files Uploaded</h3>: (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    {files?.map((f) => (
                                        <tr key={f.fileId}>
                                            <th scope="row"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
                                                <path d="M 34.179688 10.164062 C 32.103687 10.164062 30.615234 11.426266 30.615234 13.697266 L 30.648438 25.806641 C 30.648438 28.846641 32.770234 30.712891 35.615234 30.712891 C 38.460234 30.712891 40.615234 29.002891 40.615234 25.962891 L 40.615234 14.306641 L 39.613281 14.306641 L 39.523438 25.869141 C 39.523438 28.079141 37.599438 29.808594 35.648438 29.808594 C 33.697437 29.808594 31.615234 28.049844 31.615234 25.839844 L 31.644531 13.611328 C 31.644531 12.304328 33.077484 11.126953 34.271484 11.126953 C 35.465484 11.126953 36.615234 12.275031 36.615234 13.582031 L 36.615234 24.056641 C 36.615234 24.056641 36.139813 25.056641 35.632812 25.056641 C 35.125812 25.056641 34.486234 24.700391 34.615234 24.150391 L 34.615234 14.308594 L 33.615234 14.308594 L 33.582031 23.964844 C 33.582031 25.344844 34.32225 25.964844 35.65625 25.964844 C 36.99025 25.964844 37.615234 25.249141 37.615234 23.869141 L 37.615234 13.664062 C 37.615234 11.393062 36.255687 10.164062 34.179688 10.164062 z M 41.613281 11.306641 C 41.061281 11.306641 40.613281 11.754641 40.613281 12.306641 C 40.613281 12.858641 41.061281 13.306641 41.613281 13.306641 L 59.613281 13.306641 L 59.613281 23.792969 C 59.613281 29.039969 63.881906 33.306641 69.128906 33.306641 L 79.613281 33.306641 L 79.613281 82.574219 C 79.613281 86.837219 76.146812 90.306641 71.882812 90.306641 L 28.347656 90.306641 C 24.084656 90.306641 20.615234 86.838219 20.615234 82.574219 L 20.615234 21.039062 C 20.615234 16.776063 24.083656 13.308594 28.347656 13.308594 L 29.615234 13.308594 C 30.167234 13.308594 30.615234 12.860594 30.615234 12.308594 C 30.615234 11.756594 30.167234 11.308594 29.615234 11.308594 L 28.347656 11.308594 C 22.981656 11.308594 18.615234 15.672062 18.615234 21.039062 L 18.615234 82.574219 C 18.615234 87.940219 22.980656 92.306641 28.347656 92.306641 L 71.882812 92.306641 C 77.248812 92.306641 81.613281 87.940219 81.613281 82.574219 L 81.613281 32.554688 C 81.613281 32.289688 81.508313 32.035656 81.320312 31.847656 L 61.072266 11.599609 C 60.885266 11.411609 60.630234 11.306641 60.365234 11.306641 L 41.613281 11.306641 z M 60.613281 13.966797 L 78.951172 32.306641 L 69.128906 32.306641 C 64.433906 32.306641 60.613281 28.487969 60.613281 23.792969 L 60.613281 13.966797 z M 28.371094 19.505859 C 28.245219 19.481734 28.110094 19.505984 27.996094 19.583984 C 25.878094 21.023984 24.613281 23.406078 24.613281 25.955078 L 24.613281 78.617188 C 24.613281 82.856187 28.048484 86.306641 32.271484 86.306641 L 67.955078 86.306641 C 72.178078 86.306641 75.613234 82.856188 75.615234 78.617188 L 75.615234 60.806641 C 75.615234 60.530641 75.391234 60.306641 75.115234 60.306641 C 74.839234 60.306641 74.615234 60.530641 74.615234 60.806641 L 74.615234 78.617188 C 74.615234 82.305187 71.628031 85.306641 67.957031 85.306641 L 32.273438 85.306641 C 28.602438 85.306641 25.615234 82.305188 25.615234 78.617188 L 25.615234 25.955078 C 25.615234 23.737078 26.714594 21.664156 28.558594 20.410156 C 28.786594 20.255156 28.846406 19.945797 28.691406 19.716797 C 28.613906 19.603297 28.496969 19.529984 28.371094 19.505859 z M 75.113281 47.306641 C 74.837281 47.306641 74.613281 47.530641 74.613281 47.806641 L 74.613281 50.806641 C 74.613281 51.082641 74.837281 51.306641 75.113281 51.306641 C 75.390281 51.306641 75.613281 51.082641 75.613281 50.806641 L 75.613281 47.806641 C 75.613281 47.530641 75.389281 47.306641 75.113281 47.306641 z M 30.113281 51.306641 C 29.837281 51.306641 29.613281 51.530641 29.613281 51.806641 C 29.613281 52.082641 29.837281 52.306641 30.113281 52.306641 L 53.113281 52.306641 C 53.390281 52.306641 53.613281 52.082641 53.613281 51.806641 C 53.613281 51.530641 53.389281 51.306641 53.113281 51.306641 L 30.113281 51.306641 z M 75.113281 52.306641 C 74.837281 52.306641 74.613281 52.530641 74.613281 52.806641 L 74.613281 58.806641 C 74.613281 59.082641 74.837281 59.306641 75.113281 59.306641 C 75.390281 59.306641 75.613281 59.082641 75.613281 58.806641 L 75.613281 52.806641 C 75.613281 52.530641 75.389281 52.306641 75.113281 52.306641 z M 30.113281 58.306641 C 29.837281 58.306641 29.613281 58.530641 29.613281 58.806641 C 29.613281 59.082641 29.837281 59.306641 30.113281 59.306641 L 44.113281 59.306641 C 44.390281 59.306641 44.613281 59.082641 44.613281 58.806641 C 44.613281 58.530641 44.389281 58.306641 44.113281 58.306641 L 30.113281 58.306641 z M 46.113281 58.306641 C 45.837281 58.306641 45.613281 58.530641 45.613281 58.806641 C 45.613281 59.082641 45.837281 59.306641 46.113281 59.306641 L 70.113281 59.306641 C 70.390281 59.306641 70.613281 59.082641 70.613281 58.806641 C 70.613281 58.530641 70.389281 58.306641 70.113281 58.306641 L 46.113281 58.306641 z M 30.113281 65.306641 C 29.837281 65.306641 29.613281 65.530641 29.613281 65.806641 C 29.613281 66.082641 29.837281 66.306641 30.113281 66.306641 L 48.113281 66.306641 C 48.390281 66.306641 48.613281 66.082641 48.613281 65.806641 C 48.613281 65.530641 48.389281 65.306641 48.113281 65.306641 L 30.113281 65.306641 z M 50.113281 65.306641 C 49.837281 65.306641 49.613281 65.530641 49.613281 65.806641 C 49.613281 66.082641 49.837281 66.306641 50.113281 66.306641 L 61.113281 66.306641 C 61.390281 66.306641 61.613281 66.082641 61.613281 65.806641 C 61.613281 65.530641 61.389281 65.306641 61.113281 65.306641 L 50.113281 65.306641 z M 63.113281 65.306641 C 62.837281 65.306641 62.613281 65.530641 62.613281 65.806641 C 62.613281 66.082641 62.837281 66.306641 63.113281 66.306641 L 71.113281 66.306641 C 71.390281 66.306641 71.613281 66.082641 71.613281 65.806641 C 71.613281 65.530641 71.389281 65.306641 71.113281 65.306641 L 63.113281 65.306641 z M 30.113281 72.306641 C 29.837281 72.306641 29.613281 72.530641 29.613281 72.806641 C 29.613281 73.082641 29.837281 73.306641 30.113281 73.306641 L 54.113281 73.306641 C 54.390281 73.306641 54.613281 73.082641 54.613281 72.806641 C 54.613281 72.530641 54.389281 72.306641 54.113281 72.306641 L 30.113281 72.306641 z M 57.113281 72.306641 C 56.837281 72.306641 56.613281 72.530641 56.613281 72.806641 C 56.613281 73.082641 56.837281 73.306641 57.113281 73.306641 L 70.113281 73.306641 C 70.390281 73.306641 70.613281 73.082641 70.613281 72.806641 C 70.613281 72.530641 70.389281 72.306641 70.113281 72.306641 L 57.113281 72.306641 z"></path>
                                            </svg></th>
                                            <td style={{ verticalAlign: 'middle' }}>{f.name}</td>
                                            <td style={{ verticalAlign: 'middle' }}>
                                            <button className='btn btn-info m-2' onClick={() => handleOpen(f.fileId)}>
                                                    Open
                                                </button>
                                                <button className='btn btn-success m-2' onClick={() => {
                                                    setVisible(true);
                                                    setFileId(f.fileId);
                                                }}>
                                                    Share
                                                </button>
                                                <button className='btn btn-danger m-2' onClick={() => handleFileDelete(f.fileId, fid)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            )}
                        </div>
                        <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                            >
                                <ShareModal
                                    fileId={fileId}
                                    email={email}
                                    setEmail={setEmail}
                                    radio={radio}
                                    setRadio={setRadio}
                                    handleSubmit={handleShare}
                                />
                            </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Folder
