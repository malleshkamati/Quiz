import React from 'react';
import { useNavigate } from 'react-router-dom';
import quiz_photo from '../assets/Quiz_solve.jpg';
const LandingPage = () => {
  const admin_navigate = useNavigate()
  const user_navigate=useNavigate()
  let isAdmin=localStorage.getItem('isAdmin')
  isAdmin=JSON.parse(isAdmin)
  const getstarted=()=>{
      if (isAdmin){
        admin_navigate('/take_quiz');
      }else{
        user_navigate('/give_quiz')
      }
      
    }
  
  return (
   
    <>
    <div className=' flex pt-40 -mb-40 bg-gray-300'>
      <div className='left w-2/3 pl-10' >
        <p className='text-6xl font-bold mt-3 pl-10'>Test your knowledge</p>
        <p className='text-6xl font-bold mt-3 pl-10'> unlock your potential!</p>
        <p className='text-2xl pl-10 mt-16'>Test your knowledge and have fun with our interactive quizzes. </p>
        <p className='text-2xl pl-10'>Challenge yourself on a variety of topics and see how much you know!</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-10 m-10"onClick={getstarted}>
            Get Started
          </button >

      </div>
      <div className='right h-screen '>
        
      <img src={quiz_photo} alt="Ready for quiz" className="h-1/2 rounded-3xl" />

      </div>
    </div>
    </>
  );
};

export default LandingPage;
