const express = require('express')
const shellRoute = require('./src/routes/shellroute')
const app = express()
const port = process.env.PORT||3000


//console.log('public path'+publicPath)
app.use(express.json()) // for parsing application/json
app.use(shellRoute)

app.get('/index',(req,res)=>{
    try{
        const result = "Hello World!"
        res.status(200).send(result)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log('app started at port '+port)
})