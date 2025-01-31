import axios from 'axios'
import React, { useEffect, useState } from 'react'

const initilUserInfo = {
    name : '',
    userName : '',
    email:'',
    phone:''

}

function AddUser(props) {
    const [userInfo, setUserInfo]=useState({initilUserInfo})
    useEffect( ()=>{
        
    }, [])
    const addNewUser =async ()=>{
        try{
            const response = await axios.post('http://localhost:3002/users', userInfo);
            if(response){
                props.setUserAdded();
                
            }
        }

        catch (e){
            console.log(e);
            
        }
    }

  return (
    <div className='user-view _Add-view' >
        <h1>basic information</h1>
        <div className='box'>
        
            <div className='row'>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>Full Name:</span>
                    <input type='text' className='form-control' 
                    placeholder='Enter Full Name'
                    value={userInfo.name}
                     onChange={e=>setUserInfo({...userInfo,name:e.target.value})} />
               </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>Username: </span>
                    <input type='text'
                     className='form-control' 
                     placeholder='Enter UserName'
                     value={userInfo.username}
                     onChange={e=>setUserInfo({...userInfo,username:e.target.value})} />
                      
                    
               </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>email:</span>
                    <input type='email' 
                    className='form-control' 
                    placeholder='Enter your email'
                    value={userInfo.email}
                    onChange={e=>setUserInfo({...userInfo,email:e.target.value})} />
                </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>phone:</span>
                    <input type='text'
                     className='form-control' 
                     placeholder='Enter phone number' 
                     value={userInfo.phone}
                     onChange={e=>setUserInfo({...userInfo,phone:e.target.value})} />

                   
               </p>
         </div>

            </div>
            <button className='btn btn-success'onClick={()=>addNewUser()}> Add New User</button>
        </div>
    </div>
  )

}
export default AddUser
