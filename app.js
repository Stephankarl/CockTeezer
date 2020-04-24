require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = 3000;

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });

//Requiring Routes
const liquorRoutes = require('./routes/liquorRoutes');
const cocktailRoutes = require('./routes/cocktailRoutes');
const mixerRoutes = require('./routes/mixersRoutes');
const contentAndOptionalRoutes = require('./routes/contentAndOptionalRoutes');

//Connecting the routes
app.use('/liquor', liquorRoutes);
app.use('/cocktails', cocktailRoutes);
app.use('/mixers', mixerRoutes);
app.use('/contentoptions', contentAndOptionalRoutes);

//Index route
app.get('/', (req, res) => {
    res.redirect('/cocktails');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));