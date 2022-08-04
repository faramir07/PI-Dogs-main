import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dog from '../Dog';
import Loader from '../Loader';
import DogPerPage from '../DogPerPage';

export default function AllDogs({currentPage, setCurrentPage, dogsPerPage, indexOfFirstDog, indexOfLastDog}) {

  const allDogsState = useSelector(state => state.allDogs);

  const dogs = allDogsState.slice(indexOfFirstDog, indexOfLastDog)

  const paginate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {dogs.length > 0 ? (
        dogs.map((dog, i) => (
          <Link to={`/detail/${dog.id}`} key={i} className={StyleSheet.link}>
            <Dog
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
      <div>
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
