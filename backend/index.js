const express = require('express');
const mongoose = require('mongoose');
const userController = require("./controllers/userController");
const validation = require("./validators/validations");
const roleMiddleware = require("./middleware/roleMiddleware");
const cors = require("cors");

//CONSTANTS
const PORT = 5000;
const MONGO_URL = 'mongodb://localhost:27017/auth';
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.post('/addRoles', userController.addRoles);

app.get('/getAll', roleMiddleware(['USER']), userController.getAll);

app.post('/login', userController.login);

app.post('/registration', validation.registration(), userController.registration);


function start() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Ошибка подключения: '))
    db.once('open', () => {
        console.log('BD Connect without error');
    })

    app.listen(PORT, (err) => {
        if(err) {
            console.error(err);

            return null;
        }

        console.log(`Server started on ${PORT}`);
    });
}

start();