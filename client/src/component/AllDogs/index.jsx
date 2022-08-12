import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dog from '../Dog';
import Loader from '../Loader';
import DogPerPage from '../DogPerPage';
import styles from './AllDogs.module.css'

export default function AllDogs({currentPage, setCurrentPage, dogsPerPage, indexOfFirstDog, indexOfLastDog}) {

  const allDogsState = useSelector(state => state.allDogs);

  const dogs = allDogsState.slice(indexOfFirstDog, indexOfLastDog)

  const paginate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.allcontenDogs}>
      <div  className={styles.contenDogs}>
      {dogs.length > 0 ? (
        dogs.map((dog, i) => (
          <Link to={`/detail/${dog.id}`} key={i} className={styles.link}>
            <Dog
            id={dog.id}
            img={dog.img}
            name={dog.name}
            weight_min={dog.weight_min}
            weight_max={dog.weight_max}
            temperament={dog.temperament}
            />
          </Link>
        ))
      ): (
        <div>
          <Loader />
        </div>
      )}
      </div>
      <div className={styles.paginate}>
        <DogPerPage
        paginate={paginate}
        currentPage={currentPage}
        dogsPerPage={dogsPerPage}
        alldogs={allDogsState.length}
        setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
