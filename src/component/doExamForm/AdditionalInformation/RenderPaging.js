import React from 'react';

function RenderPaging(props) {
    const{type,index,setCurrentIndex,currentIndex}=props
    let activeLink=index===currentIndex
    switch (type){
        case "touched":
            return(
                <li key={index} className='page-item'>
                    <button type={"button"} onClick={() => setCurrentIndex(index)} className={activeLink?`btn btn-primary`:`btn btn-success`}>
                        {index}
                    </button>
                </li>
            )
        case "untouched":
            return (
                <li key={index} className='page-item'>
                    <button type={"button"} onClick={() => setCurrentIndex(index)} className={activeLink?`btn btn-primary`:`btn btn-secondary`}>
                        {index}
                    </button>
                </li>
            );
    }

}

export default RenderPaging;