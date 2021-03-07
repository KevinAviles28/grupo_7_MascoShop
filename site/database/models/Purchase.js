module.exports = (sequelize, dataTypes)=> {

    const alias = 'Purchase';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        producto_id: {
            type: dataTypes.INTEGER
        },
        cliente_id: {
            type: dataTypes.INTEGER
        },
        fecha: {
            type: dataTypes.DATETIME
        }
    }

    const config = {
        tableName: 'purchases',
        timestamps: true,
        underscored: true
    }

    const Purchase = sequelize.define(alias,cols,config);
}