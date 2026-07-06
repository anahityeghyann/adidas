import React from 'react'
import s from './Container.module.sass'

const Container = ({children}) => {
  return (
    <div className={s.container}>{children}</div>
  )
}

export default Container