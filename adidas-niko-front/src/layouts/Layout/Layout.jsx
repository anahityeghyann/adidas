import React from 'react'
import Banner from '../../components/Banner/Banner';
import { Outlet, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import s from "./Layout.module.sass"

const Layout = () => {
    const {pathname} = useLocation()
    const isCartPage = pathname === "/cart"
    return(
        <div className={s.layout}>
        <Banner/>
        <Header/>
        <main className={s.main}>
        <Outlet/>
        </main>
        <Footer compact={isCartPage}/>
        </div>
    )
}


export default Layout;