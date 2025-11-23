


import { useState } from 'react';
import './App.css';
import Quizform from './components/Quizform';
import TakeQuiz from './components/TakeQuiz';
import Signup from './components/Signup';
import Signin from './components/Signin';

function App() {

  const [quizForms, setQuizForms] = useState([{ id: 0 }]);

  function addQuizForm() {
    setQuizForms(prevQuizForms => [
      ...prevQuizForms,
      { id: prevQuizForms.length }
    ]);
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className='w-8/12'>
          {quizForms.map((form, index) => (
            <Quizform 
              key={form.id} 
              que_num={index + 1} 
              addQuizForm={addQuizForm} 
            />
          ))}
        </div>
      </div>
      <Signup/>
      <Signin/>
    </>

  );
}

export default App;

