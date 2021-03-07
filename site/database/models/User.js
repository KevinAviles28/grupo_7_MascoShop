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
            type: dataTypes.STRING(45),
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
            type: dataTypes.STRING(45),
            allowNull: false
        },
        exist: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);
}