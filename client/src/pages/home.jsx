import React, { useEffect,useState } from 'react'
import NavBar from '../components/home/nav'
import TempCard from '../components/home/tempelateCard'

import eventIMG from '../assets/event.webp'
import feedImg from '../assets/feedback.webp'
import jobImg from '../assets/job.png'
import orderImg from '../assets/order.jpg'
import RecentCard from '../components/home/recentFormCard'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const navigate = useNavigate()
  const [currentUser,setCurrentUser] = useState({})
  const [loading,setLoading] = useState(false)
  const [recentForms,setRecentForms] = useState([])

  const getRecentForms = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const token = JSON.parse(localStorage.getItem('forms_token'));

      var raw = JSON.stringify({
      "token": token,
      });
  
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };
  
      fetch("http://localhost:4000/api/form/getrecentforms", requestOptions)
      .then(response => response.json())
      .then((result=>{
          setLoading(false)
          if(result.status){
            setRecentForms(result.forms)
          }else{
            
          }
      }))
      .catch((error)=>{
          setLoading(false)
      });
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('forms_token'));
    if (!token) {
      localStorage.removeItem('forms_token')
      navigate('/login')
    }else{
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "token": token,
      });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch("http://localhost:4000/api/auth/loginhome", requestOptions)
      .then(response => response.json())
      .then((result=>{

          if(!result.status){ 
            localStorage.removeItem('forms_token')
              navigate('/login')
          }else{
            const decoded = jwt_decode(token)
            setCurrentUser(decoded)
            
          }
      }))
      .catch((error)=>{
          localStorage.removeItem('forms_token')
          navigate('/login')
      });
    }
    getRecentForms()
  },[])



  


  return (
    <section className='w-screen h-screen'>
      <NavBar user={currentUser?currentUser.username:"dush valentin"}  />

      <div className="hero bg-blue-300 p-12">
        <div className="title pb-5">
          <p className='text-white font-medium'>Create a new form</p>
        </div>
        <div className="cards flex gap-3 flex-wrap">

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

          <TempCard img={eventIMG} type="Event registation" />
          <TempCard img={feedImg} type="Event Feedback" />
          <TempCard img={jobImg} type="Job application" />
          <TempCard img={orderImg} type = "Order " />
          
        </div>
      </div>

      <div className=" px-12 py-4">
        <div className="title">
          <p>Your recent forms</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-5">

          {recentForms&&recentForms.map((form,index)=>{
            return <RecentCard key={index} img={jobImg} name={form.form.title} id={form.url}/>
          })}

          {recentForms.length === 0 && <p className='text-gray-600 text-sm'>Your recent forms will appear here.</p>}

        </div>
        <ToastContainer />
      </div>

    </section>
  )
}
