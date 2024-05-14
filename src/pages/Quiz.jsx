import React, { useEffect, useState } from 'react'
import Question from '../components/Question'
import left_arrow from '../images/left-arrow.png'
import right_arrow from '../images/Right-arrow.png'
import './Quiz.css'

function Quiz() {

    const [data,setdata] = useState(null)
    const [error,seterror] = useState(null)
    const [current,setcurrent] = useState(0)
    const [score,setscore] = useState(Array(10).fill(0))
    const [selection,setselection] = useState(Array(10).fill(0))
    const [submited,setsubmit] = useState(false)
    const [correctarray,setcorrectarray] = useState(Array(10).fill(''))
    const [answerarray,setanswerarray] = useState(Array(10).fill(''))
    const [viewanswer,setviewanswer] = useState(false)
    const [questarray,setquestarray] = useState(Array(10).fill(''))
    
    //console.log(data);


    let final = score.reduce((prev,curr)=>prev+curr)
    console.log("Final Score",final);



    const fetchQuestions = async () =>{
        //console.log("fetching Questions");
        try{
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
            //console.log(response);
            if(!response.ok){
                throw new error("Error")
            }
            const quest = await response.json()
            setdata(quest['results'])

            setcorrectarray(quest['results'].map((quest)=>quest.correct_answer))
            //console.log(data)

            setquestarray(quest['results'].map((quest)=>quest.question))

        }catch(err){
            seterror(err.msg)
            //console.log(err.msg,"There is error");
        }
    }

    useEffect(()=>{
        fetchQuestions()
    },[])


    const submit = ()=>{
        console.log(score);
        setsubmit(true)
    }

    const restart = ()=>{
        setsubmit(false)
        fetchQuestions()
        setcorrectarray(Array(10).fill(''))
        setanswerarray(Array(10).fill(''))
        setscore(Array(10).fill(0))
        setviewanswer(false)
        setcurrent(0)
    }

    const changeselection = (element)=>{
        let val = element.currentTarget.innerText
        let num_val = parseInt(val-1)
        setcurrent(num_val)
    }

    //console.log("currenet",current);
  return (
    <div className='d-flex-column justify-content-center align-items-center' style={{backgroundColor:'#d4d4d4',minHeight:'100dvh'}}>

        <div className='d-flex align-items-center col-md-8 col-12 mx-auto' style={{height:'15dvh',backgroundImage:'linear-gradient(to bottom right, #3550DC, #27E9F7)',borderRadius:'0px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.4)'}}>
                   <p style={{color:'white',fontSize:'30px',fontWeight:'700',marginLeft:'30px'}}> Computer Quiz</p>
            </div>
        <div className={`col-md-8 col-12 mx-auto ${submited?'result-container':'page-container'}`}>

            
            {!submited && <div style={{width:'100%',display:'flex',overflowX:"auto"}} className="selection">
                <div style={{display:'flex'}} className='mx-auto'>
                    {data && !submited && data.map((question,index)=>(
                         <div onClick={(e)=>changeselection(e)} className="alpha" style={{height:"40px",minWidth:'40px',borderRadius:'50%',backgroundImage:`${current==index?'linear-gradient(45deg, #3550DC, #27E9F7)':answerarray[index]?'linear-gradient(45deg, #5D5D5D, #5D5D5D) ':'linear-gradient(45deg, #949494, #949494)'}`,fontWeight:'800',display:'flex',cursor:"pointer", justifyContent:'center',alignItems:'center',color:'white',marginLeft:'10px',marginRight:`${index==9?'10px':'0px'}`,marginBottom:'10px'}}>{index+1}</div>
                    ))}
                </div>
            </div>}
               
            {   
                data && !submited && data.map((question, index) => (
                    <Question number={index} key={index} quest={question} selectarray = {selection} selectfn ={setselection} scorearray = {score} scorefn ={setscore} correctarray ={correctarray} setcorrectarray ={setcorrectarray} answerarray={answerarray} setanswerarray={setanswerarray}  style={{ display: index === current ? 'block' : 'none',height:'60vh' }} />
                )) 
            }
                {!submited && <div className="buttons d-flex justify-content-around w-100">
                    <button onClick={()=>setcurrent(current == 0?9:current-1 )} style={{height:"40px",width:'40px',borderRadius:'50%',fontWeight:'800',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}} className="btn btn-primary">
                        <img src={left_arrow} alt="" />
                    </button>
                    <div onClick={submit} className="ps-3 pe-3 submit">
                        Submit Quiz
                    </div>
                    <button onClick={()=>setcurrent((current+1)%10)} style={{height:"40px",width:'40px',borderRadius:'50%',fontWeight:'800',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}  className="btn btn-primary">
                        <img src={right_arrow} alt="" />
                    </button>
                </div>}
                {submited && <div  className='submit-comp mx-auto  text-center mt-5 '>
                    <p className='mb-3' style={{fontSize:"30px",fontWeight:'800'}}>Your Score is {final}/100</p>
                    <div className="answers" >
                        
                        {viewanswer && correctarray.map((correct,index)=>{
                            return(<div>
                                <p className='mx-1'>{index+1}. {questarray[index]}</p>
                                <p className='mx-1' style={{color:'green'}}>Correct Answer : {correct}</p>
                                <p className='mx-1' style={{color:'#3550DC'}}>Your Answer: {answerarray[index]?answerarray[index]:"No Answer"}</p>
                            </div>)
                        })}
                    </div>
                    <div className='mb-5 mt-2'>
                        <button onClick={()=>setviewanswer(true)} className='btn btn-primary mx-auto'>View Answers</button>
                        <button onClick={restart} className=' ms-2 btn btn-primary mx-auto'>Restart</button>
                    </div>
    
    
                   
                </div>}
                
            
        </div>
    </div>
  )
}

export default Quiz