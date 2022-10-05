"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { DB_USER, DB_PASSWORD, DB_HOST, } = process.env;
const sequelize = new sequelize_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
    logging: false,
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs_1.default.readdirSync(path_1.default.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
    modelDefiners.push(require(path_1.default.join(__dirname, '/models', file)));
});
console.log("soy el log de Db:", modelDefiners);
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temper } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temper, { through: "Dog_temper_Id" });
Temper.belongsToMany(Dog, { through: "Dog_temper_Id" });
module.exports = Object.assign(Object.assign({}, sequelize.models), { conn: sequelize });
