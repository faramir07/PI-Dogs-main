import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../NavBar"
import { deatailDog } from '../../Redux/Actions'

export default function DetailDog(props) {

  const dogId = props.match.params.id;

  const dispatch = useDispatch();

  const dog = useSelector(state => state.dogDetails);
  console.log(dog);

  useEffect(() => {
    dispatch(deatailDog(dogId))
  }, [dispatch, dogId])

  return (
    <div>
      <NavBar />
      dog detail
    </div>
  )
}
