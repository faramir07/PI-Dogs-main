const { APY_KEY_DOG } = process.env
const axios = require("axios");
const { Dog, Temper } = require("../db.js");

async function getAllDogs() {
  // https://api.thedogapi.com/v1/breeds?api_key=b67fcfff-6222-4682-b9a0-c674d6e3fc37
  // https://api.thedogapi.com/v1/breeds/search?q=Akita
  const responceApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY_DOG}`)
  const res = await responceApi.data
  const getAllDogsApi = [];
  for (let i = 0; i < 10; i++) {
    getAllDogsApi.push({
      id: res[i].id,
      name: res[i].name,
      height_min: Number(res[i].height.metric.slice(0, 2).trim()),
      height_max: Number(res[i].height.metric.slice(-2).trim()),  // altura
      weight_min: Number(res[i].weight.metric.slice(0, 2).trim()),
      weight_max: Number(res[i].weight.metric.slice(-2).trim()),  // peso
      year: res[i].life_span,
      temperament: res[i].temperament.split(", "),
      img: `https://cdn2.thedogapi.com/images/${res[i].reference_image_id}.jpg`
    })
  }

  await getTemper(getAllDogsApi);

  const getAllDogsDb = await Dog.findAll({
    include: {
      model: Temper,
      attributes: ['name'],
    }
  });
  const dogDb = getAllDogsDb.map(e => {
    return {
      id: e.id,
      name: e.name,
      height_min: e.height_min,
      height_max: e.height_max,
      weight_min: e.weight_min,
      weight_max: e.weight_max,
      year: e.year,
      temperament: e.tempers.map(e => e.name),
      img: e.img
    }
  })
  const allDogs = [...dogDb, ...getAllDogsApi];
  return allDogs;
};

async function getTemper(arr) {
  const getTemper = await Temper.findAll({
    attributes: ['name']
  })

  if(getTemper.length === 0){
    const allTemper = arr.map(dog => dog.temperament)
    const flattemper = allTemper.flat();
    const createDb = await flattemper.forEach(temper => {
      Temper.findOrCreate({
        where: {
          name: temper
        }
      })
    });
  }else {
    const tempers = getTemper.map(e => e.name);
    return tempers;
  }
};


async function searchDog(name) {
  const responceNameApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
  const res = await responceNameApi.data;
  const dogName = {
    id: res[0].id,
    name: res[0].name,
    height_min: Number(res[0].height.metric.slice(0, 2).trim()),
    height_max: Number(res[0].height.metric.slice(-2).trim()),  // altura
    weight_min: Number(res[0].weight.metric.slice(0, 2).trim()),
    weight_max: Number(res[0].weight.metric.slice(-2).trim()),  // peso
    year: res[0].life_span,
    temperament: res[0].temperament.split(", "),
    img: `https://cdn2.thedogapi.com/images/${res[0].reference_image_id}.jpg`
  }
  return dogName;
};

async function getDogId(dogId){
  const allDogs = await getAllDogs();
  if(isNaN(dogId)){
    const findDogIdDb = await Dog.findByPK(dogId , {
      include: {
        model: Temper,
        attributes: ["name"],
      }
    })

    const dogidDb = findDogIdDb.map(e => {
      return {
        id: e.id,
        name: e.name,
        height_min: e.height_min,
        height_max: e.height_max,  // altura
        weight_min: e.weight_min,
        weight_max: e.weight_max, // peso
        year: e.life_span,
        temperament: e.temperament,
        img: e.img,
      }
    })
    return dogidDb;

  }
  const dogIdApi = allDogs.find(dog => dog.id == dogId);
  return dogIdApi;
};

async function postDog(name, height_min, height_max, weight_min, weight_max, year, temperament) {

  if(name || height_min || height_max || weight_min || weight_max ){
    const newDog = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      year,
      temperament
    });
    const temperDb = await Temper.findAll({
      where: {
        name: temperament,
      }
    });
    const dog = await newDog.addTemper(temperDb);
    return "tu mascota fue creada con exito"
  }else {
    return "campo requerido"
  }
};

module.exports = {
  getAllDogs,
  searchDog,
  getDogId,
  getTemper,
  postDog,
}
