module.exports = (sequelize, dataTypes)=>{

    const alias = 'User';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(45),
        },
        localidad: {
            type: dataTypes.STRING(45),
        },
        telefono: {
            type: dataTypes.STRING(45),
        },
        direccion: {
            type: dataTypes.STRING(45),
        },
        category: {
            type: dataTypes.INTEGER
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };

    const config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = models=> {
        User.belongsToMany(models.Product,{
            as: 'products',/* alias que contiene los productos */
            through: 'purchases',/* nombre tabla pivot */
            foreignKey: 'cliente_id',/* fk de la tabla pivot que hace referencia al modelo actual asociado */
            otherKey: 'producto_id',/* fk de la otra asociacion */
            timestamps: true,
            underscored: true
        })
    }

    return User;
}