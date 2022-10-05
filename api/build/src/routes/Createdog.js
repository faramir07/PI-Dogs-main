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
const { Router } = require('express');
const { postDog } = require('../control');
const router = Router();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament } = req.body;
    if (!name || !height_min || !height_max || !weight_min || !weight_max) {
        return res
            .status(400)
            .send({ msg: "Falta enviar datos obligatorios" });
    }
    try {
        const newDog = yield postDog(name, height_min, height_max, weight_min, weight_max, life_min, life_max, img, temperament);
        res.status(201).send(newDog);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
