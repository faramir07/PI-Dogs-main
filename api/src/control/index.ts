import { DogsType, Temperament } from "../types/index";
import axios from "axios";
import { Dog, Temper } from "../db";
import { Op } from 'sequelize';
const { APY_KEY_DOG } = process.env

const getDogsApi = async () => {
  const responceApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY_DOG}`)
  const res = await responceApi.data
  const getAllDogsApi: DogsType[] = [];
  for (let i = 0; i < 40; i++) {
    getAllDogsApi.push({
      id: res[i].id,
      name: res[i].name,
      height_min: res[i].height.metric.slice(0, 2).trim(),
      height_max: res[i].height.metric.slice(-2).trim(),
      weight_min: res[i].weight.metric.slice(0, 2).trim(),
      weight_max: res[i].weight.metric.slice(-2).trim(),
      life_min: res[i].life_span.slice(0, 2).trim(),
      life_max: res[i].life_span.slice(4, -6).trim(),
      temperament: res[i].temperament.split(", "),
      img: res[i].image.url
    })
  }
  return getAllDogsApi;
}

export const getAllDogs = async () => {
  const getAllDogsApi = await getDogsApi()
  await getTemper(getAllDogsApi);
  const getAllDogsDb = await Dog.findAll({
    include: {
      model: Temper,
      attributes: ['name'],
    }
  });

  const dogDb = getAllDogsDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height_min: e.height_min,
      height_max: e.height_max,
      weight_min: e.weight_min,
      weight_max: e.weight_max,
      life_min: e.life_min,
      life_max: e.life_max,
      img: e.img,
      temperament: e.temperament.map(e => e.name),
      createDb: e.createDb
    }
  })
  const allDogs = [...dogDb, ...getAllDogsApi];
  return allDogs;
};

export const getTemper = async (arr: DogsType[]) => {
  const getTemper: Temperament[] = await Temper.findAll({
    attributes: ['name', 'id']
  })

  if(getTemper.length === 0){
    const allTemper = arr.map(dog => dog.temperament)
    const flattemper = allTemper.flat();
    flattemper.forEach( async (temper) => {
      await Temper.findOrCreate({
        where: {
          name: temper
        }
      })
    });
  }else {
    const tempers = getTemper.map(e => {
      return ({
        name: e.name,
        id: e.id
      })
    } );
    return tempers;
  }
};

export const searchDog = async (name: string) => {
  const responceNameApi = await getDogsApi()

  const getAllDogsDb = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]:'%' + name + '%'
      }
    },
    include: {
      model: Temper,
      attributes: ['name'],
    }
  });

  const dogDb = getAllDogsDb.map((e: DogsType) => {
    return {
      id: e.id,
      name: e.name,
      height_min: e.height_min,
      height_max: e.height_max,
      weight_min: e.weight_min,
      weight_max: e.weight_max,
      life_min: e.life_min,
      life_max: e.life_max,
      img: e.img,
      temperament: e.temperament.map(e => e.name),
      createDb: e.createDb
    }
  })

    const allDogs = [...dogDb, ...responceNameApi]

    if(!name){
      return allDogs;
    } else {
      const dogName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
      return dogName;
};
}

export const getDogId = async (dogId: string | number) => {
  const allDogs = await getAllDogs();
  if(typeof dogId === "string"){
    const findDogIdDb = await Dog.findByPk(dogId , {
      include: {
        model: Temper,
        attributes: ["name"],
      }
    })
      return {
        id: findDogIdDb.id,
        name: findDogIdDb.name,
        height_min: findDogIdDb.height_min,
        height_max: findDogIdDb.height_max,
        weight_min: findDogIdDb.weight_min,
        weight_max: findDogIdDb.weight_max,
        life_min: findDogIdDb.life_min,
        life_max: findDogIdDb.life_min,
        img: findDogIdDb.img,
        createDb: findDogIdDb.createDb,
        temperament: findDogIdDb.temperament.map(temper => temper.name),
      }
  }

  const dogIdApi = allDogs?.find(dog => dog.id == dogId);
  return dogIdApi;
};

export const postDog = async(
  name: string,
  height_min: number,
  height_max: number,
  weight_min: number,
  weight_max: number,
  life_min: number,
  life_max: number,
  img: string,
  temperament: Temperament) => {

  if(name || height_min || height_max || weight_min || weight_max){
    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_min,
      life_max,
      img,
      temperament,
    });
    const temperDb = await Temper.findAll({
      where: {
        name: temperament,
      }
    });
    await newDog.addTemper(temperDb);
    return {mensasge: "tenemos un peludo para ti ve a 'home'"}
  }else {
    return {message: "campo requerido"}
  }
};

module.exports = {
  getAllDogs,
  searchDog,
  getDogId,
  getTemper,
  postDog,
}
