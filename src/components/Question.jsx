import React, { Children, useState } from 'react'

function Question({number,quest,style,scorearray,scorefn,correctarray, setcorrectarray,answerarray,setanswerarray}) {
    const [selected,setselected] = useState(null)
    let questarray
    const alpha = ['A','B','C','D']
    const correctanswer = quest.correct_answer

    console.log(correctanswer,correctarray,"allcorect");
    

    
    
    questarray = []
    for(let i=0;i<quest.incorrect_answers.length;i++){
        questarray.push(quest.incorrect_answers[i])
        }
    questarray.push(quest.correct_answer)

    

    // console.log(questarray,"questarray");


    const select = (element)=>{
        let answer = element.currentTarget.children[1].innerText;
        let option = element.currentTarget.dataset.option
        setselected(option)
        console.log(number);
        console.log("correct answer",correctanswer,"slected answer",answer);

        let c_array = [...correctarray]
        c_array[number] = correctanswer
        setcorrectarray(c_array)
       

        let a_array = [...answerarray]
        a_array[number] = answer
        setanswerarray(a_array)
        if(answer == correctanswer){
            let new_array = [...scorearray]
            new_array[number] = 10
            scorefn(new_array)
        }
        else{
            let new_array = [...scorearray]
            new_array[number] = 0
            scorefn(new_array)
        }
        

    }

    

  return (
    <div style={style} className='ms-4 me-4'>
        <div style={{fontSize:'20px',fontWeight:'800'}} className='mt-5 mb-4 ' >{quest['question'] }</div>
        {
            questarray && questarray.map((quest,index)=>(
                <div style={{cursor:'pointer'}} key={index} data-option={index} onClick={(e)=>select(e)}  className={`d-flex mb-3 align-items-center gap-2 ${selected == index?'select':''}`} >
                    <div className="alpha" style={{height:"40px",width:'40px',borderRadius:'50%',backgroundImage:`${selected==index?'linear-gradient(45deg, #3550DC, #27E9F7)':'linear-gradient(45deg, #949494, #949494)'}`,fontWeight:'800',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>{alpha[index]}</div>
                    <div className="option" style={{fontSize:'15px',fontWeight:'600',color:`${selected == index?'#3550DC':'black'}`}} >{quest}</div>
                </div>
               
            ))
        }
    </div>
  )
}

export default Question