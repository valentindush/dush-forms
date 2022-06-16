import React, { useEffect, useState } from 'react'
import logo from '../logo1.png'
import { useParams } from 'react-router-dom'
export default function ViewForm() {

  const id  = useParams()

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('forms_token'))
    if(!token){
      navigate('/login')
    }

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "token": token,
      "form": id
      });

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch("http://localhost:4000/api/form/getform", requestOptions)
      .then(response => response.json())
      .then((result=>{

          if(!result.status){ 
              navigate('/login')
          }else{
            const decoded = jwt_decode(token)
            setCurrentUser(decoded)
            console.log(decoded)
            
          }
      }))
      .catch((error)=>{
          navigate('/login')
      });


  },[])

  const [form,setForm] = useState({})
  return (
    <div className='p-4 w-full bg-blue-500 flex items-center justify-between sticky top-0 bg-opacity-70 backdrop-blur-md'>
      <div className="brand flex items-center gap-4">
          <a href="/">
              <img src={logo} className='w-12 h-12' />
          </a>
          <p className='font-medium text-md text-white'>VR global competition</p>

      </div>

      <div className="right flex items-center cursor-pointer relative">
          <div className="profile flex items-center gap-2">
              <img className='object-cover w-8 h-8 rounded-full block' src="https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
              <p className='text-sm text-white'>dush valentin</p>
          </div>

      </div>
    </div>
  )
}
