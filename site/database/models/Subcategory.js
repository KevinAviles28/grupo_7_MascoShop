module.exports = (sequelize, dataTypes)=> {

    const alias = 'Subcategory';

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
        }
    };

    const config = {
        tableName: 'subcategorys',
        timestamps: false 
    }


    const Subcategory = sequelize.define(alias,cols,config);
}