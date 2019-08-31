const moment = require ('moment')
const fs = require ('fs')

const logger = (name, action) => {
    fs.readFile ('src/server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log ('can not read')
        } else {
            let stats = JSON.parse (data)

            stats.push ({
                time: moment().format ('DD MM YYYY, h:mm:ss a'),
                prod_name: name,
                action: action
            })
            fs.writeFile ('src/server/db/stats.json', JSON.stringify (stats), (err) => {
                if (err) {
                    console.log ('can not write')
                }
            })
        }
    })
}

module.exports = logger