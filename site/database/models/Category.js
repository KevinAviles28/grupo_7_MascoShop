module.exports=(sequelize,dataTypes)=>{
    const alias="Categoria"
    const cols={
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
    const config={
        tableName:'categorys',
        timestamps:false,
    }
    const Categoria=sequelize.define(alias,cols,config);

    Categoria.associate=function(models){
        Categoria.belongsToMany(models.SubCategoria,{/* cambiar el modelo con subcategorias */
            as:"subcategoria",
            through:"cate_sub",
            foreignKey:"category_id",
            otherKey:"sub_category_id",
            timestamps:false
        })
    }

    return Categoria;
}