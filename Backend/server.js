const express =require('express')
const path = require('path')
const cors = require('cors')
const { default: axios } = require('axios')


const app=express()
app.use(express.json())
app.use(cors())

const Port =process.env.Port||5000

let stocks={
  GOOG:0,
  AMZN:0,
  TSLA:0,
  META:0,
  NVDA:0
}

const updateStocks=()=>{
  stocks={
  GOOG: Math.floor(Math.random() * 1000),
  AMZN: Math.floor(Math.random() * 1000),
  TSLA: Math.floor(Math.random() * 1000),
  META: Math.floor(Math.random() * 1000),
  NVDA: Math.floor(Math.random() * 1000)
  }
}
setInterval(updateStocks, 1950)

app.get('/api/stocks',(request, response)=>{
  response.send(stocks),
  console.log(stocks);
})
let users=[];

  axios.get('http://localhost:5001/data')
  .then((response)=>{
    users=response.data;
  })

app.get('/api/users',(request, response)=>{
  response.send(users),
  console.log(users);
})

app.post('/api/users',(request,response)=>{
  const {Email, Password, Stocks}=request.body;
  const newUsers={ id: new Date().getTime().toString(), Email,Password,Stocks}
  users.push(newUsers);
  axios.post("http://localhost:5001/data",newUsers)
  .then(()=>{
    console.log("data send");
  })
  .catch((er)=>{console.log(er)})
  response.status(201).json(newUsers);
})

app.use(express.static(path.join(__dirname,'..client/public')))

app.get('/',(request,response)=>{
  response.sendFile(path.join(__dirname,'../client/public/index.html'))
})

app.listen(Port,()=>{
  console.log(`Server Is Running at ${Port}`);
})