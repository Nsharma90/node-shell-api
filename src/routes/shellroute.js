const express = require('express')
const route = express.Router()
const { exec, spawn } = require('child_process');

route.get('/shell/tasks',(req, res) => {    
    try{ 
        exec('tasklist', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          res.status(200).send(stdout)
        });       
       
    }
    catch(e){
        res.status(500).send(e)
    }
  })

  module.exports=route