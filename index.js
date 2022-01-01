import fs from 'fs'
import express from 'express'

//  express server config

const app = express()  // initializing express
const PORT = process.env.PORT || 8080 // assign port
app.use(express.json()) // make all request send from this server as json

// to create a file
app.get('/create-file', (req, res)=> {
    
    // data of date time

    let dateString = new Date().toLocaleDateString() // get date string
    dateString = dateString.split('/') 
    let date = dateString.join('-')
    let time = new Date().toLocaleTimeString();  // get time string
    time=time.split(':')
    time=time.join('-')
    time=time.split(' ')
    time=time.join('-')
    let fileName = `${date}-${time}`
    let timeStamp = new Date().getTime() // get current timestamp

    // console.log(fileName, timeStamp)

    // write a file

    fs.writeFile(`files/${fileName}.txt`, `${timeStamp}`, (err)=> {
     let responce = err? err : {status: true, fileName: `${fileName}.txt`, path: `/file/${fileName}` }
     console.log(responce)
     res.send(responce)
    })
    
})

//  get files 

app.get('/files', (req, res)=>{
let filenames = fs.readdirSync('files');  // folder name || location of the files
let result = []
filenames.forEach(file => {
let data = {
    name: file,
    path: `/files/${file}`
}
result.push(data)
});
res.send(result)
})

//get file data || read data

// app.get('/files/:name', (req, res)=>{
//     let name = req.params.name
//     console.log(name)
//     fs.readFile(`files/${name}`,'utf-8', (err, data)=>{
//         err?  res.send(err): res.send(data)

//     })
// })

// homepage

app.get('/', (req, res)=>{
    fs.readFile('index.html','utf-8', (err, data)=>{
        err? res.send(err) : res.send(data)
    })
})

app.listen(PORT, ()=> console.log("Server started in port " + PORT))
