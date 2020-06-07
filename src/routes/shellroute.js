const express = require('express')
const route = express.Router()
const { exec, spawn } = require('child_process');

route.get('/shell/tasks',(req, res) => {    
    try{ 
        exec('tasklist /fo csv', (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          //console.log(stdout);
          //res.status(200).send(res.json({"result":stdout.split("\r\n")}))
          res.status(200).send(formatData(stdout))
        });       
       
    }
    catch(e){
        res.status(500).send(e)
    }
  })


  formatData = (input) => {
     //console.log(input);
    let result = []
  
    let lines = input.split("\r\n");
    
    //lines = lines.split("\"");
    lines = lines.filter((i) => {
      if (i.length && i !== ',' && i !== 'undefined') {
        //i = i.split("\"")
        //console.log(i)
        return i//.split("\"")
      }
    }).map((m,idx)=>{
      m=m.split("\"").filter(x=>x.length && x !==",");
      return m
    });
    let [header,...data] = lines;
   // console.log(">>>"+data)
    for (var i = 0; i < data.length; i++) {
      let newobject = {}
      //if(i<5){console.log(">>>"+data[i])} 
      for( idx=0;idx <header.length;idx++){
        if(typeof newobject[header[idx]] === 'undefined'){
          newobject[header[idx]]='';
        }
        let value = data[i][idx];
       // console.log("i="+i+">>>"+value)
        //if(i<5){console.log("i="+i+">>>"+value)} 
        //if(idx===1){
          //console.log(">>>"+header[idx])
        //}
        newobject[header[idx]] = value//typeof value ==='undefined' ? '' : value;
        console.log(JSON.stringify(newobject))
      }   
     // console.log(">>>>>>>>>>>>>>>>>>>"+JSON.stringify(newobject))
      result.push(newobject);
     // console.log(result)
    }
    //console.log(result)
    //console.log(result)
  return JSON.stringify(result);
  }
  


  formatData_old=(input)=>{

    let result = [];
    input=input.filter(i=>i.length).map((i,idx)=>{
      i=i.split('  ').filter(x=>x.length);
      //to-do remove blank/==== line after header 
       if(idx !== 0){
         i.splice(0,1);
      }
      return i;
    })
    console.log(">>>>>>>>>>.."+input)
    let[headers,...data]=input;

    for(var idx=0;idx<data.length;idx++){

      let newObj = {}
      for(var header=0;header<headers.length;header++ ){
        if(typeof newObj[headers[header]] === 'undefined'){
          newObj[headers[header]]='';
        }
        let value = data[idx][header];
        newObj[headers[header]] = typeof value ==='undefined' ? '' : value;
      }
      result.push[newObj]
    }
    return result;
  } 

  module.exports=route