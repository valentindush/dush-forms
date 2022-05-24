import React from 'react'

export default function Login() {
  return (
    <div className='container h-screen flex items-center justify-center'>
        <div className="shadow-md flex border-[1px] border-gray-300 w-[600px] rounded-md">
            <div className="brand rounded-l-md  bg-blue-500 p-4">
                <h2 className='text-lg text-center'>dushFORMSv[logo]</h2>

                <div className="">
                    <p className='text-center mt-20 text-white '>
                        Create forms, Share them and get results about it for freee
                    </p>
                </div>
            </div>
            <div className='form w-full'>
                <div className="title w-full pt-3">
                    <h3 className='text-lg font-medium text-center'>Welcome back !</h3>
                </div>
                <form action="#" className='p-8 px-3'>

                    <input type="email" placeholder='Email' className='w-full block p-2 outline-none border-2 border-gray-300 mt-2 rounded-md focus:border-blue-400'/>
                    <input type="text" placeholder='Password' className='w-full block p-2 outline-none border-2 border-gray-300 mt-2 rounded-md focus:border-blue-400'/>

                    <p className='text-sm text-red-400 text-center mt-3'></p>

                    <button type='submit' className='w-full mt-4 bg-blue-500 text-white p-2 rounded-md'>Login</button>  

                    <p className='text-sm text-center mt-2 text-gray-500'>Already have account? <a href="/" className='text-blue-400'>Login</a></p>                  
                </form>
            </div>
        </div>
    </div>
  )
}
