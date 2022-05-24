import React from 'react'

export default function NavBar() {
  return (
    <div className='p-4 w-full bg-blue-500 flex items-center justify-between'>
        <div className="brand">
            <p className='font-bold text-lg text-white'>dushForms</p>
        </div>

        <div className="right flex items-center cursor-pointer relative">
            <div className="profile flex items-center gap-2">
                <img className='object-cover w-8 h-8 rounded-full block' src="https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
                <p className='text-sm text-white'>dush valentin</p>
            </div>

            <div className="icon px-3">
                <svg className='w-5 h-5 fill-white cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg>
            </div>
        </div>
    </div>
  )
}
