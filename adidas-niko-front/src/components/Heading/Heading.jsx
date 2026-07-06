import React from 'react'
import s from './Heading.module.sass';


const Heading = ({title, align="center"}) => {
    return(
        <h2 className={s.heading} style={{textAlign:align}}>{title}</h2>
    )
}


export default Heading;