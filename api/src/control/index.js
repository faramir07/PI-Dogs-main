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
      height: res[i].height.metric,  // altura
      weight: res[i].weight.metric,  // peso
      year: res[i].life_span,
      temperament: res[i].temperament.split(", "),
      img: `https://cdn2.thedogapi.com/images/${res[i].reference_image_id}.jpg`
    })
  }
  await getTemper(getAllDogsApi);
  const getAllDogsDb = await Dog.findAll({
    include: {
      model: Temper,
      attributes: 'name',
    }
  });
  const allDogs = [...getAllDogsDb, ...getAllDogsApi];
  return allDogs;
};

async function searchDog(name) {
  const responceNameApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
  const res = await responceNameApi.data;
  const dogName = [{
    id: res.id,
    name: res.name,
    height: res.height.metric,  // altura
    weight: res.weight.metric,  // peso
    year: res.life_span,
    temperament: res.temperament.split(", "),
    img: `https://cdn2.thedogapi.com/images/${res.reference_image_id}.jpg`
  }]
  return dogName;
};


async function getDogId(id){
  const allDogs = await getAllDogs();
  if(isNaN(id)){
    const findDogIdDb = await Dog.findByPK(id , {
      include: {
        model: Temper,
        attributes: "name",
      }
    })

    const dogidDb = findDogIdDb.map(e => {
      return {
        id: e.id,
        name: e.name,
        height: e.height,  // altura
        weight: e.weight,  // peso
        year: e.life_span,
        temperament: e.temperament,
        img: e.img,
      }
    })
    return dogidDb;
  }
  const DogIdApi = allDogs.filter(e => e.id === id);
  return DogIdApi;
};

async function getTemper(arr) {
  const allTemper = await arr.map(dog => dog.temperament)
  await allTemper.forEach(async (temper) => {
    await Temper.findOrCreate({
      where: {
        name: temper
      }
    })
  })
};

async function postDog(name, height, weight, year, temperament) {
  if(name || height || weight ){
    const newDog = await Dog.create({
      name,
      height,
      weight,
      year,
      temperament
    });
    const temperDb = await Temper.findAll({
      where: {name: temperament}
    });
    const dog = await newDog.addTemper(temperDb);
    return dog;
  }else {
    return "campo requerido"
  }
};

module.exports = {
  getAllDogs,
  searchDog,
  getDogId,
  getTemper,
  postDog
}
