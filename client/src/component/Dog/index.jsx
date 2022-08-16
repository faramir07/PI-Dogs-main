import React from "react"
import styles from './Dog.module.css'

export default function Dog({id, img, name, weight_min, weight_max, temperament}) {
  return (
    <div className={styles.conteDog}>
      <img className={styles.imgdog} src={img} alt={name}/>
      <div className={styles.text}>
        <h4 className={styles.titlename}>{name}</h4>
        <p>{weight_min} - {weight_max} Kg</p>
        <div>
          <p className={styles.titletemper}>Temperamento:</p>
          <div className={styles.contentemper}>
            {temperament.map((temper, i) => (
            <p className={styles.temper} key={id+i}>{temper}.</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
