import React, { useEffect, useState } from 'react'
import logo from '../logo1.png'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Question from '../components/view/question'
import { toast } from 'react-toastify'

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


  const handler = (index,answer)=>{
    
    const newQuestions = [...questions]
    newQuestions[index].answer = answer
    setQuestions(newQuestions)
  }

  const submit = ()=>{
    //Check if all questions are answered
    const requiredQuestions = questions.filter(question=>question.required)
    const textQuestions = requiredQuestions.filter(question=>question.type === 'text')
    const checkboxQuestions = requiredQuestions.filter(question=>question.type === 'checkbox')
    const radioQuestions = requiredQuestions.filter(question=>question.type === 'radio')

    const unansweredQuestions = textQuestions.filter(question=>question.answer === '')
    const unansweredCheckboxQuestions = checkboxQuestions.filter(question=>question.answer.length === 0)
    const unansweredRadioQuestions = radioQuestions.filter(question=>question.answer === '')

    if(unansweredQuestions.length > 0 || unansweredCheckboxQuestions.length > 0 || unansweredRadioQuestions.length > 0){
      const toastOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
      toast.error('Please answer all required questions', toastOptions)
    }
    //Submit form

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = JSON.parse(localStorage.getItem('forms_token'))

    const resultsWithForm = {
      title: title,
      subtitle: form.subtitle,
      questions: questions,
    }

    let raw = JSON.stringify({
      "token": token,
      "url": id.url,
      "results": resultsWithForm,
    })

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    }

    fetch("http://localhost:4000/api/form/submit", requestOptions)
    .then(response => response.json())
    .then((result=>{
        console.log(result);
    })).catch((error)=>{
        console.log(error);
    })

  }

 

  return (
    <section className='bg-gray-200 min-h-screen'>
        <div className='p-4 w-full bg-blue-500 flex items-center justify-between sticky z-10 top-0 bg-opacity-70 backdrop-blur-md'>
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

        <div className={`form sm:w-[90%] md:w-[600px] lg:w-[600px] m-auto mt-5  h-fit flex flex-col gap-2 pb-5 }`}>
            <div className="header p-4 bg-white rounded-lg">
              <div className="title">
                <h2 className='text-xl text-gray-700 py-4 font-semibold'>{title}</h2>
              </div>
              <div className="desc">
                <h3 className='txt-sm text-gray-500'>{form.subtitle}</h3>
              </div>
            </div>  
            {questions.map((question,index)=>{
                return <Question key={index} id={index} handler={handler} question={question} />
            })}

            <div className="flex justify-between px-1">
              <button className='bg-blue-400 p-2 px-8 font-medium rounded-lg text-white'>Submit</button>
              <button className='bg-red-400 p-2 px-8 font-medium rounded-lg text-white'>Cancel</button>
            </div>

        </div>
    </section>
  )
}
