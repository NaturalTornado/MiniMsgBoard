

    const { resolveInclude, render } = require("ejs");
    const express = require("express");
    const path = require("path");
    const app = express();

    const PORT = 3000;

    const newMessage = require('./newMessage');
const { title } = require("process");

    app.use(express.urlencoded( { extended: true }));

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");


    const messages = [
        {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
        },
        {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
        }
    ];

    app.get("/", (req, res) => {
        
        res.render('HomePage', { title: 'Mini Message Board Home Page' });
    }); 

    app.get("/new", (req, res) => {

        res.render('form', {title: 'Add a new message'});

    });

    app.post('/new', (req, res) => {
        const { messageText, messageUser } = req.body;
        messages.push({ text: messageText, user: messageUser, added: new Date(), });
        res.redirect('/');

    });

    app.get('/messages', (req, res) => {

        res.render('views', { title: 'Mini Message Board!!!!', messages  });

    });


    app.get('/messages/:username', (req, res) => {

        const username = req.params.username;
        const message = messages.find(msg => msg.user === username);

        if (message) {
            res.render('messageDetails', {title: 'Message Details', message });

        } else {

            res.status(404).send('Message Not Fond');

        }

        

    })
   

    app.listen(PORT, () => {
    console.log(`Mini Mesage Board App - listening on port ${PORT}!`);
    });
