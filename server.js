const express = require('express');
const app = express();
const db = require('./config/firebase/config').firestore();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', express.static(__dirname + '/assets'));
app.set('view engine','ejs');
app.set('views','./views')


app.get('/',(req, res) => {res.render('index')})

app.post("/history",async (req, res) => {
    console.log(req.body);
    await db.collection('history').add({
        ...req.body,
        createdAt: new Date()
    })
    res.json({ status: 201, msg: "Successfully Created!"})
})


app.listen(8000, () => {console.log("Server is running... [PORT:9000]");});