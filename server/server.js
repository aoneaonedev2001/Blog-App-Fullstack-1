const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { readdirSync } = require('fs')
//Upload Image
const multer = require("multer")
const path = require("path")
app.use("/images", express.static(path.join(__dirname, "/images")))


// ConnectDB
const  connectDB = require('./config/db')
connectDB()


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())


//multer Upload Image
const storage = multer.diskStorage({
    destination: (req, file, callb) => {
      callb(null, "images")
    },
    filename: (req, file, callb) => {
      //callb(null, "file.png")
      callb(null, req.body.name)
    },
  })
  const upload = multer({ storage: storage })
  app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
  })

  
// Route #1
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/posts'))



app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})