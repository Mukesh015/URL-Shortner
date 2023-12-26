const express = require('express')
const { connectToMngoDB } = require('./connection')
const urlRoute = require('./routes/url')
const URL = require('./models/url')

const app = express();
app.use(express.json())
const PORT = 5500;

connectToMngoDB('mongodb+srv://Mukesh:Mukesh%402002@learn-mongodb.yxla1ty.mongodb.net/url-shortner')
.then(()=>console.log('DB connected'))
.catch((err)=>console.log('Connection failed',err))

app.use('/url',urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp :Date.now()
            },
        },
    });
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})