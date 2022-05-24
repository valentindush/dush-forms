import React from 'react'
import NavBar from '../components/home/nav'
import TempCard from '../components/home/tempelateCard'

export default function Home() {
  return (
    <section className='w-screen h-screen'>
      <NavBar />

      <div className="hero bg-blue-300 p-12 px-24">
        <div className="title pb-5">
          <p className='text-white font-medium'>Create a new form</p>
        </div>
        <div className="cards">

          <a href="/create?temp=1" className='block'>

            <div className='w-[200px] h-[200px]  rounded-md shadow-md'>
              <div className='bg-white w-full h-[80%] rounded-t-md flex items-center justify-center font-normal text-sm'>
              <svg className='w-16 h-16 fill-blue-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
              </div>
              <div className="">
                  <p className='text-center text-sm mt-2 text-white'>Blank form</p>
              </div>
            </div>
          </a>

          
        </div>
      </div>
    </section>
  )
}
