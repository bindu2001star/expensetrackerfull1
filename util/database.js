const Sequelize=require('sequelize');
const sequelize=new Sequelize('expensetracker1','root','BINDU@2001#123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;