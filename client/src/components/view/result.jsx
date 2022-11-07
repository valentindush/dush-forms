import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './animate.css'
export const Result = (props) => {

    const {res,id} = props
    const [showAll,setShowAll] = useState(false)
    const [user,setUser] = useState({})

    const getUser = ()=>{
        const token = JSON.parse(localStorage.getItem('forms_token'))
        let headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append('Authorization',"Bearer "+token)
        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        }

        fetch('http://localhost:4000/api/results/getuserinfo/'+id,requestOptions)
        .then(res=>res.json())
        .then((res)=>{
            console.log("User info");
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUser()
    },[])

  return (
    <div className='p-3 border border-blue-300 rounded relative pb-7 anime'>
        <div className="opacity-70">
            <h4 className='font-medium text-lg'></h4>
            <p className='font-medium text-sm'></p>
        </div>
        {showAll&&<div className="pt-3">
          {res.questions.map((q,i)=>{
            return(
                <div className="bg-gray-200 p-3 mt-1 rounded-lg">
                        <p className='font-medium text-sm text-gray-600'>Question: {q.name}</p>
                        <p className='font-medium text-sm text-gray-600'>type: {q.type}</p>
                        <p className='font-medium text-sm text-gray-600 mt-2'>answer: {q.answer}</p>
                    </div>
            )
          })}
        </div>}
        <div className="absolute right-3 bottom-0">
            <button className='p-2' onClick={()=>setShowAll(!showAll)}>
                <svg className='w-5 h-5 opacity-70' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
            </button>
        </div>
    </div>
  )
}
