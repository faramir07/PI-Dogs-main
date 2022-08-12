import React from "react"
import styles from './Dog.module.css'

export default function Dog({id, img, name, weight_min, weight_max, temperament}) {

  return (
    <div className={styles.conteDog}>
      <img className={styles.imgdog} src={img} alt={name}/>
      <div className={styles.text}>
      <h4>{name}</h4>
      <p>{weight_min} - {weight_max} Kg</p>
      <div>
      <p>Temperamento:</p>
      <div className={styles.temper}>
      {temperament.map((temper, i) => (
        <p key={id+i}>{temper}.</p>
      ))}
      </div>
      </div>
      </div>
    </div>
  )
}
