import React from 'react';
import { Button, Grid, Link } from '@material-ui/core';

import Header from '../components/Header';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <>
            <Header />
            <img src='./img/homePage.jpg' id='homepageImg' />
            <div id="slogen">השקעה בגינה<br/> מתחילה <Link href="/gardenFurnitures">כאן</Link></div>


        </>
    )
}

export default HomePage;