import React from 'react'

export default function RecentCard(props) {
  return (
    <a href={`/form?id=${props.id}`}>
        <div className='w-[200px] h-[200px] shadow-md border-[2px] bg-blue-400" rounded-md border-gray-500 border-opacity-30'>
            <div className="img w-full h-[80%] bg-white rounded-t-md ">
                <img className='w-full h-full object-cover' src={props.img} alt="img" />
            </div>
            <div className="">
                <p className='text-center text-sm mt-2 text-black'>{props.name}</p>
            </div>
        </div>
    </a>
  )
}
