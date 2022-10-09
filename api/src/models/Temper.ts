import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: { define: (arg0: string, arg1: { id: { type: DataTypes.AbstractDataTypeConstructor; allowNull: boolean; primaryKey: boolean; defaultValue: DataTypes.AbstractDataTypeConstructor; }; name: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean; }; }, arg2: { timestamps: boolean; }) => void; }) => {
  // defino el modelo
  sequelize.define('temper', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false });
};
