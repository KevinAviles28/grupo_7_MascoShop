module.exports=(sequelize,dataTypes)=>{

    const alias = "ImagenPredefinada"
    
    const cols = {
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        imagenAnimal:{
            type:dataTypes.STRING(45),
            allowNull:false
        }
    }

    const config = {
        tableName:'imagespredefinidas',
        timestamps:false,
    }

    const ImagenPredefinada = sequelize.define(alias,cols,config);

   
    return ImagenPredefinada;
}