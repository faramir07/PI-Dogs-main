"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => {
    const { APY_KEY_DOG } = process.env;
    const axios = require("axios");
    const { Dog, Temper } = require("../db.js");
    const { Op } = require('sequelize');
    function getAllDogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const responceApi = yield axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY_DOG}`);
            const res = yield responceApi.data;
            const getAllDogsApi = [];
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
                });
            }
            yield getTemper(getAllDogsApi);
            const getAllDogsDb = yield Dog.findAll({
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
                    temperament: e.tempers.map(e => e.name),
                    createDb: e.createDb
                };
            });
            const allDogs = [...dogDb, ...getAllDogsApi];
            return allDogs;
        });
    }
    ;
    function getTemper(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            const getTemper = yield Temper.findAll({
                attributes: ['name', 'id']
            });
            if (getTemper.length === 0) {
                const allTemper = arr.map(dog => dog.temperament);
                const flattemper = allTemper.flat();
                const createDb = yield flattemper.forEach(temper => {
                    Temper.findOrCreate({
                        where: {
                            name: temper
                        }
                    });
                });
            }
            else {
                const tempers = getTemper.map(e => {
                    return ({
                        name: e.name,
                        id: e.id
                    });
                });
                return tempers;
            }
        });
    }
    ;
    function searchDog(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const responceNameApi = yield axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APY_KEY_DOG}`);
            const res = yield responceNameApi.data;
            const getAllDogsApi = [];
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
                });
            }
            const getAllDogsDb = yield Dog.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
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
                    temperament: e.tempers.map(e => e.name),
                    createDb: e.createDb
                };
            });
            const allDogs = [...dogDb, ...getAllDogsApi];
            if (!name) {
                return allDogs;
            }
            else {
                const dogName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
                return dogName;
            }
            ;
        });
    }
    function getDogId(dogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allDogs = yield getAllDogs();
            if (isNaN(dogId)) {
                const findDogIdDb = yield Dog.findByPk(dogId, {
                    include: {
                        model: Temper,
                        attributes: ["name"],
                    }
                });
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
                    temperament: findDogIdDb.tempers.map(temper => temper.name),
                };
            }
            const dogIdApi = allDogs.find(dog => dog.id == dogId);
            return dogIdApi;
        });
    }
    ;
    function postDog(name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name || height_min || height_max || weight_min || weight_max) {
                const newDog = yield Dog.create({
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
                const temperDb = yield Temper.findAll({
                    where: {
                        name: temperament,
                    }
                });
                const dog = yield newDog.addTemper(temperDb);
                return "tenemos un peludo para ti ve a 'home'";
            }
            else {
                return "campo requerido";
            }
        });
    }
    ;
    module.exports = {
        getAllDogs,
        searchDog,
        getDogId,
        getTemper,
        postDog,
    };
})();
