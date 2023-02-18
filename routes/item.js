const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var enteries=require('../config/info');
//var message="";
//const reg = require('./routes/auth.js');
const router = express.Router();
const { application } = require('express');
var message="";
router.get('/admin',(req,res)=>
{
    if (req.isAuthenticated()) {
    enteries.find({request_id:req.user.id},function(err,result)
    {
        if(err)
        console.log(err);
        else
        res.render("admin.ejs",{items:result,message:message,user:req.user});
    });
      }
    else
    {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
    
});

router.post('/add',(req,res)=>
{
var rid=req.user.id;
var titlename=req.body.title;
 var desc= req.body.des;
 var price=req.body.price;
 var quantity=req.body.quantity;
 var amt=price*quantity;
 var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
console.log(datetime);
  let added= new enteries({
  request_id:rid,
  title:titlename,
  description:desc,
  price:price,
  quantity:quantity,
  amount:amt,
  date:datetime
 });

 added.save()
 .then(doc => {
  message="Item added successfully";
 })
 .catch(err => {
   console.error(err)
 })
  res.redirect('/item/admin');
 
});
router.post('/delete/:id',(req,res)=>
{
    enteries.findByIdAndRemove(req.params.id, function(err){
        if(err){
            message="error";
            res.redirect("/item/admin");
        } else {
            message="deletion successfull"
            res.redirect("/item/admin");
        }
     });
}
);
router.get('/edit/:id',(req,res)=>
{
    enteries.find({ id: req.params.id}, function (err, docs) {
        if (err){
            console.log("error found");
        }
        else{
            console.log(docs);
          res.render('edit.ejs',{item:docs});
        }
    })
}
);
router.post('/edit/:id',(req,res)=>
{
    var titlename=req.body.title;
 var desc= req.body.des;
 var price=req.body.price;  
 const filter = { id:req.params.id};
const update = {title:titlename,description: desc,price:price };
const opts = { new: true };
let doc = enteries.findOneAndUpdate(filter, update,opts);
message="updated successfully";
res.redirect('/item/admin');

// `doc` is the document _before_ `update` was applied

}
);

router.post('/search',(req,res)=>
{ 
   var title=req.body.box;
    enteries.find({title:title},function(err,result)
    {
        if(err)
       { message="item not exists";
        res.redirect('/admin');}
        else
        res.render("admin.ejs",{message:"search result",items:result});
    });
    
});

module.exports=router;
  