import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Home from '../components/Home';
import Quiz from '../components/quiz/Quiz'
import Addquestion from '../components/question/Addquestion';
import Updatequestion from '../components/question/Updatequestion';
import Getallquiz from '../components/quiz/Getallquiz';
import QuizResult from '../components/quiz/QuizResult';
import QuizStepper from '../components/quiz/QuizStepper';


function App() {

  return (
    <main className='container mt-5 mb-5'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/quiz-stepper' element={<QuizStepper />}/>
          <Route path='/take-quiz' element={<Quiz />}/>
          <Route path='/create-quiz' element={<Addquestion />}/>
          <Route path='/update-quiz/:id' element={<Updatequestion />}/>
          <Route path='/all-quizzes' element={<Getallquiz />}/>
          <Route path='/quiz-result' element={<QuizResult />}/>
        </Routes>
      </Router>

    </main>
  )
}

export default App
