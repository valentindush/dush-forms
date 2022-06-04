import React from 'react'

export default function Question(props) {
  const question = props.question
  console.log(question)
  return (
    <div className='p-4 bg-white rounded-lg'>
      <div className="name">
        <h2>{question.name}</h2>
      </div>
      <div className="">
        <p className='text-sm'>Anwer type: {question.type}</p>
      </div>
      {question.options.lenght !== 0 && 
      <div className="options pt-3">
        <h2 className='font-medium pb-2'>Options :</h2>
        <div className="px-2">
          <p className='text-sm font-normal'>Option 1</p>
          <p className='text-sm font-normal'>Option 2</p>
          <p className='text-sm font-normal'>Option 3</p>
          <p className='text-sm font-normal'>Option 4</p>
        </div>
      </div>}
    </div>
  )
}
