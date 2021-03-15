module.exports=(sequelize,dataTypes)=>{
    const alias="Cate_subs"
    const cols={
        id:{
            type:dataTypes.INTEGER, /* tipo de dato que es */
            primaryKey: true,   /* si es una clave primaria */
            autoIncrement:true/* si es auto Incrementar */
        },
        sub_category_id:{
            type:dataTypes.INTEGER
        },
        category_id:{
            type:dataTypes.INTEGER
        }
    }
    const config={
        tableName:'cate_sub',
        timestamps:false,
    }
    const Cate_subs=sequelize.define(alias,cols,config);

    Cate_subs.associate=function(models){
        Cate_subs.hasMany(models.Productos,{
            as:"productos",
            foreignKey:"cate_sub_id",
        })
        Cate_subs.belongsTo(models.Categoria,{
            as:"categoria",
            foreignKey:"category_id"
        })
        Cate_subs.belongsTo(models.SubCategoria,{
            as:"subcategoria",
            foreignKey:"sub_category_id"
        })
    }

    return Cate_subs;
}