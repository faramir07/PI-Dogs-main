const { Router } = require('express');
const router = Router();
const { getTemper } = require('../control')

router.get('/', async (req, res, next) => {
  try {
    const temperDog =  await getTemper()
    res.send(temperDog)
  } catch (error) {
    next(error)
  }
})


module.exports = router;
