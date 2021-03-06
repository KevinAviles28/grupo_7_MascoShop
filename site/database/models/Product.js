module.exports=(sequelize,dataTypes)=>{

    const alias = "Productos"

    const cols = {
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        precio:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        stock:{
            type:dataTypes.INTEGER,
            
        },
        discount:{
            type:dataTypes.INTEGER,
           
        },
        description:{
            type:dataTypes.STRING(300),
            allowNull:false
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        subcategory_id:{
            type: dataTypes.INTEGER
        }
    }

    const config = {
        tableName: 'products',
        timestamps: false,
    }

    const Productos = sequelize.define(alias,cols,config);

    Productos.associate = function(models){
        Productos.hasMany(models.ImagenProducto,{
            as:"imagenProducto",
            foreignKey:"product_id"
        })
        Productos.belongsTo(models.Categoria,{
            as:"categoria",
            foreignKey:"category_id"       
        });
        Productos.belongsTo(models.SubCategoria,{
            as:"subcategoria",
            foreignKey:"subcategory_id"       
        });
    }
    /* asociasiones */

    return Productos;
}