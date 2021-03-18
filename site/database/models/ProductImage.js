module.exports=(sequelize,dataTypes)=>{

    const alias = "ImagenProducto"

    const cols = {
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        product_name:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        product_id:{
            type:dataTypes.INTEGER
        }
    }

    const config = {
        tableName:'product_images',
        timestamps:false,
    }

    const ImagenProducto = sequelize.define(alias,cols,config);

    ImagenProducto.associate=function(models){
        ImagenProducto.belongsTo(models.Productos,{
            as:"producto",
            foreignKey:"product_id",
        })
    }

    return ImagenProducto;
}