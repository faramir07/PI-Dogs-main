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
    const { Router } = require('express');
    const { getAllDogs, searchDog, getDogId } = require('../control');
    const router = Router();
    router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        try {
            if (name) {
                const searchDogName = yield searchDog(name);
                res.status(201).json(searchDogName);
            }
            else {
                const getDogsAll = yield getAllDogs();
                res.status(201).json(getDogsAll);
            }
        }
        catch (error) {
            next(error);
        }
    }));
    router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const getDog = yield getDogId(id);
            res.status(201).json(getDog);
        }
        catch (error) {
            next(error);
        }
    }));
    module.exports = router;
    // router.get('/', passport.authenticate('jwt', {session: false}),
    // checkRoles('admin', 'seller', 'customer'),
    // async (req, res, nex) => {
    //   try {
    //     const categories = await service.find();
    //     res.joson(categories)
    //   } catch (error) {
    //     nex(error)
    //   }
    // })
})();
