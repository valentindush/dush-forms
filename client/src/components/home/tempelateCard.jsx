import React from 'react'

export default function TempCard(props) {
  return (
    <a href={`/create?temp=${props.type}`}>
        <div className='w-[200px] h-[200px]'>
            <div className="img w-full h-[80%]">
                <img className='w-full h-full object-cover' src={props.img} alt="img" />
            </div>
            <div className="">
                <p className='text-center text-sm mt-2 text-white'>{props.type}</p>
            </div>
        </div>
    </a>
  )
}
