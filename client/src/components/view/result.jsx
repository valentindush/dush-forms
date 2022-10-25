import React from 'react'
import { useState } from 'react'
import './animate.css'
export const Result = (props) => {

    const {res} = props
    const [showAll,setShowAll] = useState(false)
  return (
    <div className='p-3 border border-blue-300 rounded relative pb-7 anime'>
        <div className="opacity-70">
            <h4 className='font-medium text-lg'>{res.username}</h4>
            <p className='font-medium text-sm'>{res.email}</p>
        </div>
        {showAll&&<div className="pt-3">
            {res.answers.map((ans, index) => {
                
                return (
                    <div className="bg-gray-200 p-3 mt-1 rounded-lg">
                        <p className='font-medium text-sm text-gray-600'>{ans.question}</p>
                        <p className='font-medium text-sm text-gray-600'>{ans.answer}</p>
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
