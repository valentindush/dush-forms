import React, { useEffect, useState } from 'react'
import Navbar_CREATE from '../components/create/navbar'
import {MenuItem, Select, Switch, TextField} from '@mui/material'
import Question from './question'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
  const [showTxt, setShowTxt] = useState(false)
  const [questionType,setQuestionType] = useState('text')
  const [showForm, setShowForm] = useState(false)
  const [qestionName, setQestionName] = useState("")
  const [showAddOption,setShowAddOption] = useState(false)
  const [optionName,setOptionName] = useState("")
  const [optEl, setOptEl] = useState(<></>)
  const [isRequired,setIsRequired] = useState(true)

  const [questions, setQuestions] = useState([])
  const [options,setOptions] = useState([])

  const [formTitle, setFormTitle] = useState("")
  const [formSubTitle, setFormSubTitle] = useState("")

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('forms_token'));
    if (!token) {
      navigate('/login')
    }else{
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "token": token,
      });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch("http://localhost:4000/api/auth/loginhome", requestOptions)
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
    }
  },[])



  const handleQtypeChange = (e)=>{
    setQuestionType(e.target.value)
  }

  const addQuestion = ()=>{
    if(questionType && qestionName !== ""){
      let newQestion = {
        type: questionType,
        name: qestionName,
        required: isRequired,
        options: [...options]
      }
      setQuestions([...questions,newQestion])
      setOptions([])
      setQestionName("")
      setOptEl(<></>)
      setShowForm(false)
    }
  }

  const addOption = (option)=>{
    if(questionType !== 'text'){
        setOptions([...options,option])
        let el = <p className='font-medium text-sm'>{option}</p>
        setOptEl(<>{optEl} {el}</>)
        setOptionName("")
        setShowAddOption(false)
    }
  }

  const addForm = ()=>{
    if(questions.length > 0){
      const toastOptions = {
        position: "top-right",
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }

      const form = {
        title: formTitle,
        subtitle: formSubTitle,
        questions: [...questions]
      }

      console.log(form)

      //Sending request to server

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = JSON.parse(localStorage.getItem('forms_token'));

      var raw = JSON.stringify({
      "token": token,
      "form": form
      });
  
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };
  
      fetch("http://localhost:4000/api/form/create", requestOptions)
      .then(response => response.json())
      .then((result=>{
          setLoading(false)
          if(result.status){ 
              localStorage.setItem('forms_token', JSON.stringify(result.token))
              navigate('/')
          }else{
              toast.error(result.msg, toastOptions)
          }
      }))
      .catch((error)=>{
          setLoading(false)
          toast.error("Something went wrong", toastOptions)
      });
    }
    

  }


  return (
    <section className="bg-gray-200 h-screen overflow-auto">
      <Navbar_CREATE />

      <section className='main flex items-center justify-center'>
        <div className="form  w-[500px]  mt-5  h-fit flex flex-col gap-4 pb-5">
            <div className="header p-4 bg-white rounded-lg">
              <div className="title">
                <input type="text" placeholder='Form title' value={formTitle} onChange={(e)=>setFormTitle(e.target.value)} className='block w-full outline-none p-2 border-b-[1px] border-black border-opacity-20 focus:border-blue-600 text-lg font-medium' />
              </div>
              <div className="desc">
                <textarea type="text" placeholder='Form description' className='block w-full outline-none p-2 border-b-[1px] border-black border-opacity-20 focus:border-blue-600 resize-none text-sm' onChange={(e)=>setFormSubTitle(e.target.value)} >{formSubTitle}</textarea>
              </div>
            </div>
            {questions.length !==0 && <>
              {questions.map((q)=>{
                return <Question key={q.id} question={q} />
              })}
            </>}

            {questions.length !== 0 && <div className="w-fulf flex justify-between">
              <button onClick={addForm} className='bg-blue-400 text-white px-4 py-2 rounded-lg cursor-pointer'>Finish</button>
              <button onClick={()=>setQuestions([])} className='bg-red-400 text-white px-4 py-2 rounded-lg cursor-pointer'>Cancel</button>
            </div>}
            
        </div>

        <div onClick={()=>setShowForm(true)} className="add bg-white shadow-md rounded-full p-4 cursor-pointer absolute right-[28%] top-[30%] hover:bg-gray-200 transition duration-300 ease-in">
          <svg className='w-6 h-6 fill-blue-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg> 
        </div>

        <ToastContainer />

      </section>

        {
          showForm === true &&

          <div className='absolute w-screen h-screen bg-black bg-opacity-50 top-0 flex flex-col items-center justify-center text-xs'>
          
          <div className="form bg-white p-4 rounded-lg w-[500px]">
            <div className="title text-center">New question</div>

            <div className="border-b-[1px] border-black border-opacity-20 p-2 flex items-center justify-between">
              <h2>Queation name</h2>
              
              <div className="">
                <TextField
                value={qestionName}
                onChange={(e)=>setQestionName(e.target.value)}
                size='small'
                  variant='filled'
                  label="Question name"
                 />
              </div>
            </div>

            <div className="border-b-[1px] border-black border-opacity-20 p-2 flex items-center justify-between">
              <h2>Answer type</h2>
              
              <div className="">
                <Select
                  value={questionType}
                  onChange={handleQtypeChange}
                  size='small'
                >
                  <MenuItem  value={'text'}>Text</MenuItem>
                  <MenuItem value={'checkbox'}>Check boxes</MenuItem>
                  <MenuItem value={'radio'}>Multiple Choice</MenuItem>
                </Select>
              </div>
            </div>

            {questionType !== 'text' && <div className="px-2 pt-3 relative">
              <div className="flex items-center justify-between z-0 bg-white">
                <h2 className='text-sm'>Options : </h2>  
                <button onClick={()=>setShowAddOption(true)} className="bg-blue-400 text-white p-1 px-3 rounded-md text-sm" >New option</button>
              </div>

              {showAddOption && <div className="add_option absolute z-10 bg-blue-100 p-4 rounded-md left-20 top-0">
                <TextField value={optionName} onChange={(e)=>setOptionName(e.target.value)} size='small' label='Option name' variant='filled'/>
                <div className="flex gap-4 pt-4">
                  <button className='bg-blue-400 text-white p-2 text-sm px-4 rounded-md' onClick={()=>addOption(optionName)}>Add</button>
                  <button className='bg-red-400 text-white p-2 text-sm px-4 rounded-md' onClick={()=>setShowAddOption(false)}>Cancel</button>
                </div>
              </div>}

              <div className="options py-2 px-4">
                {optEl}
              </div>
            </div>}

            <div className="border-b-[1px] border-black border-opacity-20 p-2 flex items-center justify-between">
              <h2>Required ?</h2>
              
              <div className="">
                <Switch value={isRequired} onChange={(e)=>setIsRequired(e.target.value)} defaultChecked color='primary' />
              </div>
            </div>

            <div className="buttons flex justify-between pt-5">

              <button onClick={()=> setShowForm(false)} className="bg-red-400 text-white p-2 px-5 rounded-md text-xs">Cancel</button>
              <button onClick={addQuestion} className="bg-blue-400 text-white p-2 px-5 rounded-md text-xs">Add question</button>

            </div>

          </div>
      </div>
        }

    </section>
  )
}
