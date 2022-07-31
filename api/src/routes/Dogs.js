const { Router } = require('express');
const { getAllDogs, searchDog, getDogId } = require('../control');

const router = Router();

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    if(name){
      const searchDogName = await searchDog(name);
      res.status(201).json(searchDogName)
    }else {
      const getDogsAll = await getAllDogs()
      res.status(201).json(getDogsAll)
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const getDog = await getDogId(id)
    res.json(getDog);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
