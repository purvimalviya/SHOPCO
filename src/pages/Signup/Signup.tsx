import {useState} from 'react'
import { signup, login, logout } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from '../../store/auth-slice';

export default function Signup() {

  const dispatch = useDispatch();
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [mail,setMail] = useState<string>('');
  const [pass,setPass] = useState<string>('');
  // const auth_email = useSelector((state: any) => state.auth.user.email); 
  const auth_email = useSelector((state: any) => state.auth.user?.email || null);



  const handleSignup = async ()=>{
    try{
      const userCredential =  await signup(mail,pass)
      const { uid, email } = userCredential.user;
      dispatch(setUser({uid,email}))
      console.log(userCredential.user)
    }
    catch(err){
      console.log("Error : ",err)
    }
  }

  const handleLogin = async ()=>{
    try{
      const userCredential = await login(mail,pass)
      const { uid, email } = userCredential.user;
      dispatch(setUser({uid,email}))
      console.log(userCredential.user)
    }
    catch(err){
      console.log("Error : ", err)
    }
  }

  const handleLogout = async ()=>{
    try{
      await logout()
      dispatch(removeUser())
      console.log("user logged out")
    }
    catch(err){
      console.log("Error : ", err)
    }
  }

  return (
    <div className='w-full flex flex-row justify-center px-4 my-5'>
      {
        isNewUser && !auth_email && (
          <div className='flex flex-col gap-4 bg-custom-gray p-10 w-1/2 md:w-3/4 lg:w-[90%] lg:p-5'>
            <div>
              <p className='font-semibold'>Shop Endless</p>
              <h2 className='text-2xl font-bold mb-3'>Welcome to Shopco, </h2>
            </div>
            <input placeholder="Email" type="text" value={mail} onChange={(e)=>setMail(e.target.value)}
              className='rounded-full bg-white w-full py-2 px-4'
            />
            <input placeholder="Password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)}
              className='rounded-full bg-white w-full py-2 px-4'
            />
            <button onClick={handleSignup} className='bg-black text-white mt-5 p-2 cursor-pointer'>Sign Up</button>
            <p onClick={()=>setIsNewUser(false)} className='text-blue-700 font-medium'>Already have account?</p>
          </div>
        )
      }

    {
        !isNewUser && !auth_email && (
          <div className='flex flex-col gap-4 bg-custom-gray p-10 w-1/2 md:w-3/4 lg:w-[90%] lg:p-5'>
            <div>
              <p className='font-semibold'>Shop Endless</p>
              <h2 className='text-2xl font-bold mb-3'>Welcome to Shopco, </h2>
            </div>
            <input placeholder="Email" type="text" value={mail} onChange={(e)=>setMail(e.target.value)}
              className='rounded-full bg-white w-full py-2 px-4'
            />
            <input placeholder="Password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)}
              className='rounded-full bg-white w-full py-2 px-4'
            />
            <button onClick={handleLogin} className='bg-black text-white mt-5 p-2 cursor-pointer'>Log In</button>
            <p onClick={()=>setIsNewUser(true)} className='text-blue-700 font-medium'><span className='text-gray-600'>New user?</span> Register now</p>
          </div>
        )
      }

      {
        auth_email && (
          <div className='flex flex-col w-3/4 gap-5'>
            <h2 className='font-bold text-3xl'>Hello User,</h2>
            <div>
              <p className='font-semibold text-gray-600 text-sm'>Registered Email Address</p>
              <p className='text-gray-500 text-xl'>{auth_email} </p>
            </div>
            <button className='w-fit px-5 py-2 bg-black text-white cursor-pointer' onClick={handleLogout}>Logout</button>
          </div>
        )
      }

    </div>
  )
}


//verify email
// show categories, explore, breadcrumbs
// pagination
//dark mode
// mailer