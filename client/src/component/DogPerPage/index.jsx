import React, { useState } from "react"
import styles from './DogPerPage.module.css'

export default function DogPerPage({paginate, currentPage, dogsPerPage, alldogs, setCurrentPage}) {

  const [pageLimit] = useState(5);
  const [maxPageLimit, setmaxPageLimit] = useState(5);
  const [minPageLimit, setminPageLimit] = useState(0);

  const numPage = [];

  for (let i = 1; i <= Math.ceil(alldogs / dogsPerPage); i++){
    numPage.push(i)
  }

  function handleNextPage() {
    if(currentPage !== numPage.length){
      setCurrentPage(currentPage + 1)
    }
    if(currentPage +1  > maxPageLimit){
      setmaxPageLimit(maxPageLimit + pageLimit);
      setminPageLimit(minPageLimit + pageLimit);
    }
  }

  function handlePrevPage() {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
      if((currentPage - 1) % pageLimit === 0){
        setmaxPageLimit(maxPageLimit - pageLimit);
        setminPageLimit(minPageLimit - pageLimit);
      }
    }
  }

  return (
    <div>
      <ul className={styles.contepaginate}>
        {currentPage !== 1 ?
        <button className={styles.button} onClick={handlePrevPage}>Anterior</button>        
        : null
        }
        {numPage && numPage.map((page, i) => {
          if(page < maxPageLimit + 1 && page > minPageLimit) {
            return(
              <li key={i} className={styles.pagination_item}>
                <span className={currentPage === page ? styles.active : styles.page} onClick={() => paginate(page)}>{page}</span>
              </li>
            )
          } else {
            return null
          }
        })}
        {currentPage !== numPage.length ?
        <button className={styles.button} onClick={handleNextPage}>Siguiente</button>
        : null
        }
      </ul>
    </div>
  )
}
