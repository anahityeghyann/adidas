import React from 'react'
import s from './Dressstyle.module.sass'
import Container from '../Container/Container'
import style_1 from "../../assets/img/style_1.png"
import style_2 from "../../assets/img/style_2.png"
import style_3 from "../../assets/img/style_3.png"
import style_4 from "../../assets/img/style_4.png"


const Dressstyle = () => {
  return (
    <div className={s.over}>
      <Container>

        <div className={s.wrap}>
          <h1 className={s.heading}>Browse by dress style</h1>
          <div className={s.grid}>
            <div className={`${s.firstStyle} ${s.box}`} style={{backgroundImage: `url("${style_1}")`}}>
              <div className={s.text}>Casual</div>
            </div>
            <div className={`${s.secondStyle} ${s.box}`} style={{backgroundImage: `url("${style_2}")`}}>
              <div className={s.text}>Formal</div>
            </div>
            <div className={`${s.thirdStyle} ${s.box}`} style={{backgroundImage: `url("${style_3}")`}}>
              <div className={s.text}>Party</div>
            </div>
            <div className={`${s.fourthStyle} ${s.box}`} style={{backgroundImage: `url("${style_4}")`}}>
              <div className={s.text}>Gym</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Dressstyle