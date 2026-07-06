import React from 'react'
import s from './Hero.module.sass'
import Container from '../Container/Container'
import hero from '../../assets/img/hero.png'

const Hero = () => {
    return (
        <div className={s.hero}>
            <Container>
                <div className={s.wrap}>
                    <div className={s.box}>
                        <h1 className={s.heading}>Find clothes that matches your style</h1>
                        <p className={s.text}>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                        <button className={s.button}>Shop now</button>
                        <div className={s.stats}>
                            <div className={s.item}>
                                <div className={s.number}>200+</div>
                                <div className={s.title}>International Brands</div>
                            </div>
                            <div className={s.item}>
                                <div className={s.number}>2,000+</div>
                                <div className={s.title}>High-Quality Products</div>
                            </div>
                            <div className={s.item}>
                                <div className={s.number}>30,000+</div>
                                <div className={s.title}>Happy Customers</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.img}><img src={hero} alt="" /></div>
                </div>
            </Container>
        </div>
    )
}

export default Hero