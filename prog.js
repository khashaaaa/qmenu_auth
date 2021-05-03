const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const { connector } = require('./engine/config/connector')

const prog = express()

prog.use(session({
    secret: 'qmenu',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
prog.use(cors())
prog.use(express.json())
prog.use(express.urlencoded({ extended: true }))

const { ManagerModel } = require('./engine/models/manager.model')
const { CompanyModel } = require('./engine/models/company.model')

const { ManagerRouter } = require('./engine/routes/manager.route')
const { CompanyRouter } = require('./engine/routes/company.route')
prog.use('/manager', ManagerRouter)
prog.use('/company', CompanyRouter)

prog.listen(3001, (aldaa, ololt) => connector.getConnection((errcon, conn) => {

    ManagerModel.init((error, result) => {
        conn.release()
        if(error) {
            conn.release()
            console.log(error)
        }
    })
    CompanyModel.init((error, result) => {
        conn.release()
        if(error) {
            conn.release()
            console.log(error)
        }
    })

    aldaa && console.log(aldaa)

    errcon && console.log('Error: ' + errcon)

    console.log('Database connection started')
}))