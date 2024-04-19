const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const mainRouter = require('./routers/mainRouter')
const authRouter = require('./routers/authRouter')
const canteenMenuRouter = require('./routers/canteenMenuRouter');
const orderRouter = require("./routers/orderRouters");
const feedbackRouter = require('./routers/feedbackRouter')

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>Error 500 : Internal Server Error</h1>');
});


app.use('/auth',authRouter)

app.use("/", mainRouter);
app.use('/menu',canteenMenuRouter)
app.use('/order',orderRouter)
app.use('/feedback',feedbackRouter)
app.route('/ownerpage').get((req,res)=>{
    res.redirect('/order/order-request')
})

app.listen(8080);
