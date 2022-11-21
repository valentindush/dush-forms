import React, { useEffect, useState } from 'react'
import logo from '../logo1.png'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Question from '../components/view/question'
import { toast, ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { Result } from '../components/view/result'
import {host} from '../utils/apiRoutes'
export default function ViewForm() {

  const id  = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  const [profile,setProfile] = useState({})
  const [isOwner,setIsOwner] = useState(false)
  const [results,setResults] = useState([])

  const [formSubmitted, setFormSubmitted] = useState(false)
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('forms_token'))
    if(!token){
      navigate('/login')
    }

    const decoded = jwtDecode(token)
    setProfile(decoded)

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

      fetch(`${host}/api/form/getform`, requestOptions)
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
    setLoading(true)
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
      setLoading(false)
      toast.error('Please answer all required questions', toastOptions)
      return
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

    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }

    fetch(`${host}/api/form/submit`, requestOptions)
    .then(response => response.json())
    .then((result=>{
        setLoading(false)
        if(result.status){
          toast.success('Form submitted', toastOptions)
          setFormSubmitted(true)
        }else{
          toast.error(result.msg, toastOptions)
        }
    })).catch((error)=>{
        setLoading(false)
        toast.error('Error submitting form', toastOptions)
    })

  }

  const getResults = ()=>{
    console.log("Running function");
    const token = JSON.parse(localStorage.getItem('forms_token'))
    let headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Authorization","Bearer "+token)
    if(!token) return

    let requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    }

    fetch(`${host}/`+id.url, requestOptions)
    .then((response)=>response.json())
    .then((result)=>{
      if(result.status){
        setResults(result.results)
        console.log(results)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  const getform = ()=>{
    const token = JSON.parse(localStorage.getItem('forms_token'))
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    if(!token) return
    let raw = JSON.stringify({
      "token": token,
      "url": id.url,
    })

    let requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw,
      redirect: 'follow'
    }

    fetch(`${host}/api/form/getform`, requestOptions)
    .then(response => response.json())
    .then((result=>{
      if(result.status && result.form[0].owner === jwtDecode(token).id){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
    }))
    .catch((error)=>{
        console.log(error);
        setIsOwner(false)
    })

  }

  useEffect(()=>{
    getform()
    getResults()
  },[])




  return (
    <section className='bg-gray-200 min-h-screen relative'>
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
                  <p className='text-sm text-white'>{profile.username}</p>
              </div>
          </div>
        </div>

        

       <div className="flex w-full gap-3">
        {formSubmitted?
        <div className='p-4 bg-white'>
          <p>Form submitted</p>
        </div>:
        <div className={`form w-[40%] m-auto mt-5  h-fit flex flex-col gap-2 pb-5 }`}>
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
                <button onClick={submit} className='bg-blue-400 p-2 px-8 font-medium rounded-lg text-white'>Submit</button>
                <button onClick={()=>{navigate("/")}} className='bg-red-400 p-2 px-8 font-medium rounded-lg text-white'>Cancel</button>
              </div>

              <ToastContainer />

        </div>}
        {isOwner&&<div className="w-[40%] h-full bg-white mt-16 mr-4 p-5 rounded-lg">
            <div className="">
              <h2 className='font-semibold text-gray-800 opacity-90'>Submits</h2>

              <div className="flex flex-col gap-2 pt-4">
                {results.map((res,indec)=>{
                  
                 return(
                 <>
                  <Result n={indec} key={indec} id={res.user} res={res.results} />
                 </>) 
                 
                })}
                {results.length == 0 && <p>No submits yet</p>}
              </div>
            </div>
        </div>}
       </div>
        {isOwner&&<div className="fixed top-24 right-24">
          <div className="flex gap-4">
            <button className='p-2 px-4 bg-blue-400 text-white text-sm rounded-lg flex items-center justify-center gap-2'><svg className='w-5 h-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500 89c13.8-11 16-31.2 5-45s-31.2-16-45-5L319.4 151.5 211.2 70.4c-11.7-8.8-27.8-8.5-39.2 .6L12 199c-13.8 11-16 31.2-5 45s31.2 16 45 5L192.6 136.5l108.2 81.1c11.7 8.8 27.8 8.5 39.2-.6L500 89zM160 256V448c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32s-32 14.3-32 32zm288-64c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320c0-17.7-14.3-32-32-32zm96-32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/></svg>Analytics</button>
            <button className='p-2 px-4 bg-blue-400 text-white text-sm rounded-lg  flex items-center justify-center gap-2'><svg className='w-5 h-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>Submits</button>
          </div>
        </div>}
        
        {loading && (
          <div className="flex flex-col gap-2 items-center absolute left-[47%] top-1/2">
            <svg
              role="status"
              class="w-8 h-8 mr-2 text-transparent animate-spin dark:fill-trasparent fill-blue-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="relative left-2">Please wait . . .</p>
          </div>
        )}
    </section>
  )
}
