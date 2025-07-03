const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

if(process.env.NODE_ENV === "development"){
router.post("/create",async function(req,res){

  let owners = await ownerModel.find();
  if(owners.length>0){
    return res.send(503)
    .send("You dont have permission to create owners in development mode");
  } 
  let {fullname,email,password} = req.body;
  let createdOwner =  await ownerModel.create({
  fullname,
  email,
  password,
  })
  res.status(201).send(createdOwner);
})
} 


router.get("/",function(req,res){
  res.send("Hey its working");
})


router.get("/admin", function(req, res) {
  const success = req.flash("success");
  const error = req.flash("error");
  res.render("createproducts", { success, error });
});




module.exports = router;