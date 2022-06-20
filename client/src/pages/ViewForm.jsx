import React, { useEffect, useState } from 'react'
import logo from '../logo1.png'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Question from '../components/view/question'

export default function ViewForm() {

  const id  = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('forms_token'))
    if(!token){
      navigate('/login')
    }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
      "token": token,
      "url": id.url
      });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch("http://localhost:4000/api/form/getform", requestOptions)
      .then(response => response.json())
      .then((result=>{
          if(result.status){ 
             setForm(result.form[0].form)
             setTitle(result.form[0].form.title)
             setQuestions(result.form[0].form.questions)
          }else{
            console.log("Error here")
          }
      }))
      .catch((error)=>{
          console.log(error);
      });


  },[])



  return (
    <section className='bg-gray-200 min-h-screen'>
        <div className='p-4 w-full bg-blue-500 flex items-center justify-between sticky top-0 bg-opacity-70 backdrop-blur-md'>
          <div className="brand flex items-center gap-4">
              <a href="/">
                  <img src={logo} className='w-12 h-12' />
              </a>
              <p className='font-medium text-md text-white'>{title}</p>

          </div>

          <div className="right flex items-center cursor-pointer relative">
              <div className="profile flex items-center gap-2">
                  <img className='object-cover w-8 h-8 rounded-full block' src="https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
                  <p className='text-sm text-white'>dush valentin</p>
              </div>

          </div>
        </div>

        <div className={`form sm:w-[90%] md:w-[600px] lg:w-[600px] m-auto mt-5  h-fit flex flex-col gap-4 pb-5 }`}>
            <div className="header p-4 bg-white rounded-lg">
              <div className="title">
                <h2 className='text-xl text-gray-700 py-4 font-semibold'>{"Title"}</h2>
              </div>
              <div className="desc">
                <h3 className='txt-sm text-gray-500'>{"SUBtitle"}</h3>
              </div>
            </div>  
            {questions.map((question)=>{
                return <Question question={question} />
            })}

            <div className="flex justify-between px-1">
              <button className='bg-blue-400 p-2 px-8 font-medium rounded-lg text-white'>Submit</button>
              <button className='bg-red-400 p-2 px-8 font-medium rounded-lg text-white'>Cancel</button>
            </div>

        </div>
    </section>
  )
}
