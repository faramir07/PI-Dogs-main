(() => {
  const { Router } = require('express');
  const { getAllDogs, searchDog, getDogId } = require('../control');

  const router = Router();

  interface reqName {
    query: {
      name: String;
    };
  }

  interface resGet {
    status: (arg0: number) => {
      (): any;
      new(): any;
      json: {
        (arg0: any): void;
        new(): any;
      };
    };
  }

  router.get('/', async (req: reqName, res: resGet, next: (arg0: unknown) => void) => {
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

  router.get('/:id', async (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }, next: (arg0: unknown) => void) => {
    const { id } = req.params
    try {
      const getDog = await getDogId(id)
      res.status(201).json(getDog);
    } catch (error) {
      next(error)
    }
  });

  module.exports = router;
})()
