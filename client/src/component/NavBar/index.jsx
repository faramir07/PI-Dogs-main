import React from 'react';
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export default function NavBar() {

  return (
    <div>
      <Link to='/homePage' className={styles.link}>PELUDOS</Link>
      <Link to='/adoptaDog' className={styles.link}>Adopta un Peludo</Link>
    </div>
  )

}
