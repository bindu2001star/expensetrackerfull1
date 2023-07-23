const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const controller=require('./controller');
const sequelize=require('./util/database');
const Expense=require('./models/Expense');
const axios=require('axios');
const app=express();



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
sequelize.sync()
    .then(()=>{
        console.log('details synchronised with database');
    })
    .catch((error)=>{
        console.log("failed to sync the data with database");
        console.log(error.message);
    });
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
})
app.post('/submit-form',controller.insertData);
app.get('/get-details',controller.getdetails);
app.put(`/expenses/editExpense/:id`,controller.editingExpense);
app.delete(`/Expense/delete-expense/:id`,async (req,res)=>{
    try{
        const expenseId=req.params.id;
        await Expense.destroy({where:{id:expenseId}})
        res.json({message:"deleted"})
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
});


app.listen(6002);