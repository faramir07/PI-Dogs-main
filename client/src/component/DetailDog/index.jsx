import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar"
import { deatailDog } from '../../Redux/Actions'
import styles from './DetailDog.module.css'

export default function DetailDog(props) {

  const dogId = props.match.params.id;

  const dispatch = useDispatch();

  const dog = useSelector(state => state.dogDetails);

  const {img, name, weight_max, weight_min, height_max, height_min, life_max, life_min, temperament, id} = dog;

  useEffect(() => {
    dispatch(deatailDog(dogId))
  }, [dispatch, dogId])

  return (
    <div>
      <NavBar />
      <div className={styles.contendog}>
        <div className={styles.divdog}>
        <img className={styles.img} src={img} alt={name}/>
        <div className={styles.tabledog}>
          <div className={styles.nametitle}>
            <h2>{name}</h2>
          </div>
        <table>
        <tbody>
          <tr>
            <th className={styles.encabezado}>CARACTERISTICAS</th>
            <th className={styles.encabezado}>MIN</th>
            <th className={styles.encabezado}>MAX</th>
          </tr>
          <tr>
            <th className={styles.caracteristicas}>PESO</th>
            <th className={styles.data}>{weight_min}</th>
            <th className={styles.data}>{weight_max}</th>
          </tr>
          <tr>
            <th className={styles.caracteristicas}>ALTURA</th>
            <th className={styles.data}>{height_min}</th>
            <th className={styles.data}>{height_max}</th>
          </tr>
          <tr>
            <th className={styles.caracteristicas}>AÑOS</th>
            <th className={styles.data}>{life_min}</th>
            <th className={styles.data}>{life_max}</th>
          </tr>
          <tr>
            <th className={styles.caracteristicas}>TEMPERAMENTO</th>
            <th colSpan="2" className={styles.encabezadotempet}>{temperament?.map((temper, i) => (
              <p key={id+i}>{temper}.</p>
              ))}</th>
          </tr>
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  )
}
