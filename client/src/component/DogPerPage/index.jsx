import React, { useState } from "react"

export default function DogPerPage({paginate, currentPage, dogsPerPage, alldogs, setCurrentPage}) {

  const [pageLimit] = useState(5);
  const [maxPageLimit, setmaxPageLimit] = useState(5);
  const [minPageLimit, setminPageLimit] = useState(0);

  const numPage = [];

  for (let i = 0; i <= Math.ceil(alldogs / dogsPerPage); i++){
    numPage.push(i)
  }

  function handleNextPage() {
    if(currentPage !== numPage.length){
      setCurrentPage(currentPage + 1)
    }
    if(currentPage + 1 >maxPageLimit){
      setmaxPageLimit(maxPageLimit + numPage);
      setminPageLimit(minPageLimit + numPage);
    }
  }

  function handlePrevPage() {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
    if((currentPage - 1) % pageLimit === 0){
      setmaxPageLimit(maxPageLimit - numPage);
      setminPageLimit(minPageLimit - numPage);
    }
  }



  return (
    <div>
      <ul>
        <button onClick={handlePrevPage}>atras</button>
        {numPage && numPage.map((page, i) => {
          if(page < maxPageLimit + 1 && page > minPageLimit) {
            return(
              <li key={i} className="pagination_item">
                <span className={currentPage === page ? "page active" : "page"} onClick={() => paginate(page)}>{page}</span>
              </li>
            )
          } else {
            return null
          }
        })}
        <button onClick={handleNextPage}>adelante</button>
      </ul>
    </div>
  )
}
