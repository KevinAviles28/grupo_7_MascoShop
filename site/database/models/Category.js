module.exports=(sequelize,dataTypes)=>{

    const alias = "Categoria"
    
    const cols = {
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        name:{
            type:dataTypes.STRING(45),
            allowNull:false
        }
    }

    const config = {
        tableName:'categorys',
        timestamps:false,
    }

    const Categoria = sequelize.define(alias,cols,config);

   

    return Categoria;
}