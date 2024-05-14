import React from 'react'
import { Link } from 'react-router-dom'

function Instructions() {
  return (
    <div style={{height:'100vh'}} className='col-md-8 col-12 mx-auto page-container'>
        <p className='text-center' style={{fontWeight:'800',fontSize:'40px'}}>Plese Read the instructions below</p>
        <ul style={{fontSize:'20px'}}>
            <li>10 points are awarded for correct answer and none for incorrect answer</li>
            <li>There are not negative markings</li>
            <li>Tap an option to select an answer</li>
            <li>Use the arrow to move to next or previous question</li>
            <li>You can answer qusetions in any order and can also come back to previously answered questions to change the answer</li>
            <li>Click on the numbers shown on the top to go to that question</li>
            <li>Click Submit when your are finished</li>
        </ul>
        <Link to={'/quiz'} className='btn btn-primary p-2'>Start Quiz</Link>

    </div>
  )
}

export default Instructions