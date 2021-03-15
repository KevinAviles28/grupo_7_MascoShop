module.exports=(sequelize,dataTypes)=>{
    const alias="SubCategoria"
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
        tableName:'sub_categorys',
        timestamps:false,
    }
    const SubCategoria=sequelize.define(alias,cols,config);

    SubCategoria.associate=function(models){
        SubCategoria.belongsToMany(models.Categoria,{
            as:"productos",
            through:"cate_sub",
            foreignKey:"sub_category_id",
            otherKey:"category_id",
            timestamps:false
        });
    }
    /* asociasiones */

    return SubCategoria;
}