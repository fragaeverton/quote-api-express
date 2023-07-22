const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) =>{
    res.send(getRandomElement(quotes))
})

app.get('/api/quotes', (req, res, next) =>{
    const {person} = req.query;
    let response = person ? quotes.filter((quote) => quote.person == person) : quotes;
    res.send({quotes:response})
    console.log("get")
})

app.post('/api/quotes', (req, res, next) =>{
    const {person, quote} = req.query;
    if( person && quote){
        let newQuote = {"person": person, "quote": quote};
        quotes.push(newQuote)
        res.status(201).send({quote: newQuote})
    }else{
        res.status(400).send()
    }
    console.log("post")
})

app.listen(PORT, () =>{
    console.log(`Listening to port ${PORT}`)
})
