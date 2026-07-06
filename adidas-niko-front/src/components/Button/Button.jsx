import React from 'react'
import s from './Button.module.sass';


const Button = ({text}) => {
    return(
        <button className={s.btn}>{text}</button>
    )
}


export default Button;