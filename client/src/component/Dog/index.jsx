import React from "react"

export default function Dog({img, name, weight_min, weight_max, temperament}) {

  return (
    <div>
      <img src={img} alt={name} />
      <h3>Raza: {name}</h3>
      <p>{weight_min} - {weight_max} Kg</p>
      <p>Temperamento: {temperament}</p>
    </div>
  )
}
