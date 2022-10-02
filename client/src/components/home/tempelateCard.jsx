import React from 'react'

export default function TempCard(props) {
  return (
    <a href={`/create?temp=${props.type}`}>
        <div className='w-[200px] h-[200px] shadow rounded-md  border-opacity-30'>
            <div className="img w-full h-[80%] bg-white rounded-t-md ">
                <img className='w-full h-full object-cover' src={props.img} alt="img" />
            </div>
            <div className="">
                <p className='text-center text-sm mt-2 text-white'>{props.type}</p>
            </div>
        </div>
    </a>
  )
}
