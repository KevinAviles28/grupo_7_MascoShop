module.exports = (sequelize, dataTypes)=>{

    const alias = 'Category';

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
        tableName: 'categorys',
        timestamps: false
    };

    const Category = sequelize.define(alias,cols,config);

    Category.associate = models=> {
        Category.hasMany(models.Product,{
            as: 'categorys',
            foreignKey: 'category_id'
        })
    };

    return Category;
}