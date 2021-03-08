module.exports = (sequelize, dataTypes)=> {

    const alias = 'Product';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        subcategory_id: {
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        exist: {
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = models=> {
        Product.belongsTo(models.Category,{
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsTo(models.Subcategory,{
            as: 'subcategory',
            foreignKey: 'subcategory_id'
        });
    }

    return Product;
}