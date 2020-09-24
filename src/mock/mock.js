const express = require('express')
const { Random } = require('mockjs')

const Mock = require('mockjs')

const app = express()

Random.ctitle()

app.use((req,res,next)=>{
   //设置响应头
   res.set('Access-Control-Allow-Origin', '*')
   res.set('Access-Control-Allow-Headers', 'content-type,token')
   res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
   next()
})

app.get('/admin/edu/subject/:page/:limit',(req,res)=>{
  const {page,limit} = req.params

  const data = Mock.mock({
    total:Random.integer(limit,limit*2),
    [`items | ${limit}`]:[
      {
        '_id|+1':1,
        title:'@ctitle(2,5)',
        parentId:0
      }
    ]
  })
  res.json({
    code:20000,
    success:true,
    data,
    message:''
  })
})

app.listen(5000,err=>{
  if(err){
    console.log('服务启动失败',err)
    return
  }
  console.log('服务器启动成功~localhost:5000')
})
