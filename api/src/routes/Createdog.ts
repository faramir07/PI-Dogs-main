import { DogsType } from '../types/index'
import { Router } from 'express';
const { postDog } = require('../control')

const router = Router();


router.post('/', async (req, res, next) => {
  const {name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament} = req.body;
  if(!name || !height_min || !height_max || !weight_min || !weight_max) {
    res.status(400).send({msg: "Falta enviar datos obligatorios"})
  }else {
    try{
      const newDog: DogsType  = await postDog(
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
  }
})

module.exports = router;
