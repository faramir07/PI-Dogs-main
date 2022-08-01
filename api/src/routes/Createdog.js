const { Router } = require('express');
const { postDog } = require('../control')

const router = Router();


router.post('/', async (req, res, next) => {
  const {name, height_min, height_max, weight_min, weight_max, year, temperament} = req.body;
  try{
    const newDog = await postDog(
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      year,
      temperament
      )
    res.status(201).send(newDog)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
