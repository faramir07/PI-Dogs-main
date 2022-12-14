const { Router } = require('express');
const { postDog } = require('../control')

const router = Router();


router.post('/', async (req, res, next) => {
  const {name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament} = req.body;
  if(!name || !height_min || !height_max || !weight_min || !weight_max) {
    return res
      .status(400)
      .send({msg: "Falta enviar datos obligatorios"})
  }
  try{
    const newDog = await postDog(
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_min,
      life_max,
      img,
      temperament,
      )
    res.status(201).send(newDog)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
