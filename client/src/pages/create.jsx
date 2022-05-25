import React, { useState } from 'react'
import Navbar_CREATE from '../components/create/navbar'
import {MenuItem, Select, Switch, TextField} from '@mui/material'

export default function Create() {
  const [showTxt, setShowTxt] = useState(false)
  const [questionType,setQuestionType] = useState('text')
  const [showForm, setShowForm] = useState(false)
  let questions = []


  // const question = {
  //   qname,
  //   qtype,
  //   options:{
  //     type,

  //   }
  // }

  // function Question(question){

  //   this.question = question
  //   this.save = ()=>{

  //   }
    
  // }
  

  // const addQuestion = ()=>{

  // }

  // const handleQtypeChange = (e)=>{
  //   setQuestionType(e.target.value)
  // }

  // const addCheckBoxOption = (value)=>{

  // }

  return (
    <section className="bg-gray-200 h-screen">
      <Navbar_CREATE />

      <section className='main flex items-center justify-center'>
        <div className="form  w-[500px]  mt-5  h-fit flex flex-col gap-4">
            <div className="header p-4 bg-white rounded-lg">
              <div className="title">
                <input type="text" value={'G.O.D website requirements'} className='block w-full outline-none p-2 border-b-[1px] border-black border-opacity-20 focus:border-blue-600 text-lg font-medium' />
              </div>
              <div className="desc">
                <textarea type="text" className='block w-full outline-none p-2 border-b-[1px] border-black border-opacity-20 focus:border-blue-600 resize-none text-sm'>give the information requires so than I cann put them into the website</textarea>
              </div>
            </div>
        </div>

        <div onClick={()=>setShowForm(true)} className="add bg-white shadow-md rounded-full p-4 cursor-pointer absolute right-[28%] top-[30%] hover:bg-gray-200 transition duration-300 ease-in">
          <svg className='w-6 h-6 fill-blue-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg> 
        </div>

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
                >
                  <MenuItem value={'text'}>Text</MenuItem>
                  <MenuItem value={'checkbox'}>Check boxes</MenuItem>
                  <MenuItem value={'radio'}>Multiple Choice</MenuItem>
                </Select>
              </div>
            </div>

            <div className="checkboxes px-2 pt-3 relative">
              <div className="flex items-center justify-between z-0 bg-white">
                <h2 className='text-sm'>Options : </h2>  
                <button className="bg-blue-400 text-white p-1 px-3 rounded-md text-xs">New option</button>
              </div>
              <div className="options">

              </div>
            </div>

            <div className="border-b-[1px] border-black border-opacity-20 p-2 flex items-center justify-between">
              <h2>Required ?</h2>
              
              <div className="">
                <Switch defaultChecked color='primary' />
              </div>
            </div>

            <div className="buttons flex justify-between pt-5">

              <button onClick={()=> setShowForm(false)} className="bg-red-400 text-white p-2 px-5 rounded-md text-xs">Cancel</button>
              <button className="bg-blue-400 text-white p-2 px-5 rounded-md text-xs">Add question</button>

            </div>

          </div>
      </div>
        }

    </section>
  )
}
