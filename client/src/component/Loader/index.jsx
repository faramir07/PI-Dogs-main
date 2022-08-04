import React from 'react'
import dogLoading from '../../images/dogLoading.gif'


export default function Loader(){
  return (
    <div>
      <img src={dogLoading} alt="loading" />
    </div>
  )
}
