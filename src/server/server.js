const express = require ('express')
const fs = require ('fs')
const cart = require ('./cartRouter')

const app = express ()

app.use (express.json ())
app.use ('/', express.static ('dist/public'))
app.use ('/api/cart', cart)

app.get ('/api/products', (req, res) => {
    fs.readFile ('src/server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0, text: 'some error'}))
        } else {
            res.send (data)
        }
    })
})

app.listen (1001, () => console.log ('listening at port 1001'))