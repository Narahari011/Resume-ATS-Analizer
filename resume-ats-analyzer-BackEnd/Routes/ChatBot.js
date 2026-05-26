const express=require("express");

const router=express.Router();

const ChatController=require("../Controllers/ChatBot");

router.post("/",ChatController.chat);

module.exports=router;