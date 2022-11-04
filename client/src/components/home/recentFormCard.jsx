import React from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function RecentCard(props) {

  const [view,setView] = useState(false)

  const switchBtnView = () =>{
    setView(!view)
  }
  
  const editForm = ()=>{

  }

  const deleteForm = ()=>{
    const token = JSON.parse(localStorage.getItem("forms_token"));
    if(!token) return
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      token: token,
      url: props.id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:4000/api/form/delete",requestOptions)
    .then(res => res.json())
    .then((res)=>{

      const toastOptions = {
        position: "top-right",
        autoClose: 7000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      };
      toast.success("Form deleted",toastOptions)
      if(res.status) {
        setTimeout(()=>{
          window.location.reload()
        },1000)
      }

    }).catch((err)=>{
      toast.error("Failed to delete form")
      console.log(err);
    })

  }

  return (
    <div className='relative'>
      <a href={`/form/${props.id}`} >
        <div className='w-[200px] h-[200px] shadow border bg-blue-400" rounded-md border-gray-500 border-opacity-30'>
            <div className="img w-full h-[70%] bg-white rounded-t-md ">
                <img className='w-full h-full object-cover' src={props.img} alt="img" />
            </div>
            <div className="">
                <p className='text-center text-sm mt-2 text-black'>{props.name}</p>
            </div>
        </div>
      </a>
      <svg onClick={switchBtnView} className='w-5 h-5 absolute bottom-2 right-2 fill-slate-700 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
      {view &&
        <div className="absolute -right-24 top-1/2 z-40">
          <button onClick={editForm} className='p-3 bg-slate-300 w-[40px] h-[40px] ml-1 fill-blue-500 rounded-full shadow'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>
          </button>
          <button onClick={deleteForm} className='p-3 bg-slate-300 w-[40px] h-[40px] ml-2 fill-red-500 rounded-full shadow'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
          </button>
        </div> 
      }
      <ToastContainer/>
    </div>
  )
}
