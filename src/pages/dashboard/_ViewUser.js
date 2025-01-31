import axios from 'axios'
import React, { useEffect, useState } from 'react'

const initilUserInfo = {
    name : '',
    userName : '',
    email:'',
    phone:''

}

function ViewUser(props) {
    const [userInfo, setUserInfo]=useState({initilUserInfo})
    useEffect( ()=>{
        fetchUserData();
    }, [])

     const fetchUserData =async ()=>{ 
        try{
                const response= await axios.get(' http://localhost:3002/users/' + props.userId);
            if (response) {
                console.log(response.data);
                setUserInfo(response.data);
            
            }
        }
        catch (e){
            console.log(e);
            
        }
            
         
    }

  return (
    <div className='user-view'>
        <h1>basic information</h1>
        <div className='box'>
        
            <div className='row'>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>Full Name:</span>
                    <span>{userInfo.name}</span>
               </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>Username: </span>
                    <span>{userInfo.username}</span>
               </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>email:</span>
                    <span>{userInfo.email}</span>
               </p>

            </div>
            <div className='col-sm-12 col-md-6'>
                <p>
                    <span>phone:</span>
                    <span>{userInfo.phone}</span>
               </p>
         </div>

            </div>
        </div>
    </div>
  )

}
export default ViewUser
