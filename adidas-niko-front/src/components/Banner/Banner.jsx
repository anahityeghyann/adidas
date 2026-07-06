import React, { useState } from 'react'
import s from './Banner.module.sass';
import { HiMiniXMark } from 'react-icons/hi2';
import { Link } from 'react-router';
import Container from '../Container/Container';


const Banner = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <dialog open={isOpen} className={s.banner}>
            <Container>
                <div className={s.wrap}>
                    <p className={s.text}>Sign up and get 20% off to your first order.<Link to="#" className={s.link}>Sign up now</Link></p>
                    <HiMiniXMark className={s.close} onClick={() => setIsOpen(false)} />
                </div>
            </Container>
        </dialog>

    )

}


export default Banner;