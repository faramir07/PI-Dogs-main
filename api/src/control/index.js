const { APY_KEY_DOG } = process.env
const axios = require("axios");
const { Dog, Temper } = require("../db.js");

async function getAllDogs() {
  // https://api.thedogapi.com/v1/breeds?api_key=b67fcfff-6222-4682-b9a0-c674d6e3fc37
  // https://api.thedogapi.com/v1/breeds/search?q=Akita
  const responceApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY_DOG}`)
  const res = await responceApi.data
  const getAllDogsApi = [];
  for (let i = 0; i < 40; i++) {
    getAllDogsApi.push({
      id: res[i].id,
      name: res[i].name,
      height_min: res[i].height.metric.slice(0, 2).trim(),
      height_max: res[i].height.metric.slice(-2).trim(),  // altura
      weight_min: res[i].weight.metric.slice(0, 2).trim(),
      weight_max: res[i].weight.metric.slice(-2).trim(),  // peso
      life_min: res[i].life_span.slice(0, 2).trim(),
      life_max: res[i].life_span.slice(4, -6).trim(),
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
      life_min: e.life_min,
      life_max: e.life_max,
      img: e.img,
      temperament: e.tempers.map(e => e.name)
    }
  })
  const allDogs = [...dogDb, ...getAllDogsApi];
  return allDogs;
};

async function getTemper(arr) {
  const getTemper = await Temper.findAll({
    attributes: ['name', 'id']
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
    const tempers = getTemper.map(e => {
      return ({
        name: e.name,
        id: e.id
      })
    } );
    return tempers;
  }
};


async function searchDog(name) {
  const responceNameApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
  const res = await responceNameApi.data;
  const dogName = {
    id: res[0].id,
    name: res[0].name,
    height_min: res[0].height.metric.slice(0, 2).trim(),
    height_max: res[0].height.metric.slice(-2).trim(),  // altura
    weight_min: res[0].weight.metric.slice(0, 2).trim(),
    weight_max: res[0].weight.metric.slice(-2).trim(),  // peso
    life_min: res[0].life_span.slice(0, 2).trim(),
    life_max: res[0].life_span.slice(4, -6).trim(),
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
        life_min: e.life_min,
        life_max: e.life_min,
        img: e.img,
        temperament: e.temperament,
      }
    })
    return dogidDb;

  }
  const dogIdApi = allDogs.find(dog => dog.id == dogId);
  return dogIdApi;
};

async function postDog(name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament) {

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
      temperament
    });
    const temperDb = await Temper.findAll({
      where: {
        name: temperament,
      }
    });
    const dog = await newDog.addTemper(temperDb);
    return "tenemos un peludo para ti ve a 'home'"
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