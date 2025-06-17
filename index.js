const express = require("express")
const { default: mongoose } = require("mongoose")
const { MONGO_URL } = require("./keys")
const PORT =3003;
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get("/api/health", (req, res)=>{
    res.send({msg: "it me rahman insta"})
})




mongoose.connect(MONGO_URL)
.then(()=> console.log("Database connected succesfully ..."))

app.use(require("./controllers/auth"))





app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})