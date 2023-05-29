import React from 'react';

function Clock(props) {
    const{formik}=props
    const[timer,setTimer]=React.useState({
        minute:formik.values.exam.time,
        second:0
    })
    let lastInterval=React.useRef(0)
    React.useEffect(()=>{
        setTimer({
            minute:formik.values.exam.time,
            second:0
        })
        clearInterval(lastInterval.current)
        lastInterval.current=setInterval(function (){
            setTimer(prevState => {
                if(prevState.second===0){
                    if(prevState.minute===0){
                        formik.handleSubmit();
                    }
                    return{
                        minute:prevState.minute-1,
                        second:59
                    }
                }else{
                    return {
                        minute: prevState.minute,
                        second: prevState.second-1
                    }
                }
            })
        },1000)
    },[formik.values.exam])
    return (
        <div>
            {timer.minute}:{timer.second}
        </div>
    );
}

export default Clock;