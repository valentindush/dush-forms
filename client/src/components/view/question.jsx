import { Checkbox, Radio, RadioGroup, TextField } from '@mui/material'
import React,{useState} from 'react'

export default function Question(props) {
    const [question, setQuestion] = useState(props.question)
  return (
        <div className='p-4 bg-white rounded-lg'>
            <div className="name">
                <h2 className='py-3'>{question.name}</h2>
                {question.type === 'text'&&<TextField className='w-full bg-white mt-3' color="primary" variant='filled' size='small'label="Add yout response" />}
            </div>
            {question.options.length > 0 && 
            <div className="options pt-3">
                <div className="px-2">
                {question.options.map((option)=>{
                    let el;

                    if(question.type === 'checkbox'){
                        el = <div className="flex items-center">
                            <Checkbox />
                            <p>{option}</p>
                        </div>
                    }else{
                        el = <div className="flex items-center">
                            <Radio />
                            <p>{option}</p>
                        </div>
                    }
                    return el
                })}
                

                </div>
            </div>}


        </div>
  )
}
