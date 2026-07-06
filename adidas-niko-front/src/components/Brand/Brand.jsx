import React from 'react'
import s from './Brand.module.sass'
import Container from '../Container/Container'
import brand1 from '../../assets/img/brand_1.png'
import brand2 from '../../assets/img/brand_2.png'
import brand3 from '../../assets/img/brand_3.png'
import brand4 from '../../assets/img/brand_4.png'
import brand5 from '../../assets/img/brand_5.png'


const brand_img = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
]

const Brand = () => {
    return (
      <div className={s.blackpart}>
        <Container>
            <div className={s.wrap}>
              {
                brand_img.map(src => <div className={s.brand}><img src={src} alt="" /></div>)
              }
            </div>
        </Container>
      </div>
    
    
  )
}

export default Brand