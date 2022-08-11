import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import bg from '../assets/bg.png'
import logo from '../logo1.png'

export default function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()



    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("forms_token"))
        if(token){
            navigate("/")
        }
    },[])

    const toastOptions = {
        position: "top-right",
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }
    const handleLogin = (e)=>{
        e.preventDefault()
        setLoading(true)
        // if(email === "" || password === ""){
        //     setLoading(false)
        //    return toast.error("Incorrect email or password", toastOptions)
        // }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": email,
        "password": password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/api/auth/login", requestOptions)
        .then(response => response.json())
        .then((result=>{
            setLoading(false)
            if(result.status){ 
                localStorage.setItem('forms_token', JSON.stringify(result.token))
                navigate('/')
            }else{
                toast.error(result.msg, toastOptions)
            }
        }))
        .catch((error)=>{
            setLoading(false)
            toast.error("Something went wrong", toastOptions)
        });


    }
  return (
    <div className='container h-screen flex items-center w-screen justify-center bg-white' style={{backgroundImage: `url(${bg})`}}>
        <div className="shadow-md flex border-[1px] border-gray-300 w-[600px] rounded-md bg-white">
            <div className="brand rounded-l-md  bg-blue-500 p-4">
                <img src={logo} alt="logo" className="w-32 mx-auto"/>
                <div className="">
                    <p className='text-center mt-20 text-white '>
                    Create forms, Share them and get results for free
                    </p>
                </div>
            </div>
            <div className='form w-full'>
                <div className="title w-full pt-3">
                    <h3 className='text-lg font-medium text-center'>Welcome back !</h3>
                </div>
                <form action="#" className={`p-8 px-3 relative ${loading?"pointer-events-none opacity-80":""}`} onSubmit={(e)=>{handleLogin(e)}}>

                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' className='w-full block p-1 text-sm outline-none border-2 border-gray-300 mt-2 rounded-md focus:border-blue-400'/>
                    <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className='w-full block p-1 text-sm outline-none border-2 border-gray-300 mt-2 rounded-md focus:border-blue-400'/>

                    <p className='text-sm text-red-400 text-center mt-3'></p>

                    <button type='submit' className='w-full mt-4 bg-blue-500 text-white p-1 rounded-md'>Login</button>  

                    <p className='text-sm text-center mt-2 text-gray-500'>Don't have account? <Link to={"/signup"} className='text-blue-400'>Create one</Link></p>  
                    {loading && <svg role="status" class="w-8 h-8 mr-2 text-transparent animate-spin dark:fill-trasparent fill-blue-400 absolute right-[45%]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>  }                   
                </form>
                <ToastContainer />
            </div>
        </div>
    </div>
  )
}
