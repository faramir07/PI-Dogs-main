import React from 'react';
import styles from './LandingPage.module.css';
import {Link} from "react-router-dom";
import landingDog from '../../images/landingdog.png';

export default function LandingPage(){

  return (
    <div className={styles.contenLandingPage}>
      <div>
        <img className={styles.img} src={landingDog} alt="App Dogs" />
      </div>
      <div className={styles.contenText}>
        <h1>Adopta a Tu Mejor Amigo Peludo</h1>
        <span>Tu mejor amigo te conoce mejor que nadie, tu lo conoces a el? Te ayudamos a escoger tu mejor amigo Peludo</span>
        <Link to='/homePage' className={styles.link}>Adoptar... </Link>
      </div>
    </div>
  )
}
