const { ManagerModel } = require('../models/manager.model')
const jwt = require('jsonwebtoken')

module.exports = {

    authToken: (yw, ir, next) => {
        const authHead = yw.headers['authorization']
        const token = authHead && authHead.split(' ')[1]

        if(token == null) return ir.status(401).json({ warning: "Нууцлалын токен байхгүй байна." })

        jwt.verify(token, process.env.QMENUSECRET, (error, decoded) => {
            if(error) return ir.sendStatus(403)
            yw.manager = decoded
            next()
        })
    },

    signIn: (yw, ir) => {

        const manager = {
            email: yw.body.email,
            phone: yw.body.phone
        }

        if(yw.body.email === '' || yw.body.phone === '') {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү." })
        }

        ManagerModel.login(manager, (error, result) => {
            if(error) {
                return ir.status(500).json(error)
            }
            if(result.length == 0) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            const token = jwt.sign(manager, process.env.QMENUSECRET, { expiresIn: 600000 })
            ir.status(200).json({ manager: result, token: token })
        })
    },

    createSingle: (yw, ir) => {

        const manager = {
            name: yw.body.name,
            email: yw.body.email,
            phone: yw.body.phone
        }

        if(yw.body.name === '' || yw.body.email === '' || yw.body.phone === '') {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү." })
        }

        ManagerModel.createOne(manager, (error, result) => {
            if(error) {
                return ir.status(409).json({ warning: "Мэдээлэл давхцаж байна." })
            }
            ir.status(201).json(result)
        })
    },

    fetchSingle: (yw, ir) => {
        
        ManagerModel.selectOne(yw.params.managerId, (error, result) => {
            if(error) {
                return ir.status(500).json(error)
            }
            if(result.length == 0) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            ir.status(200).json(result)
        })
    },

    fetchAll: (yw, ir) => {

        ManagerModel.selectAll((error, result) => {
            if(error) {
                return ir.status(500).json(error)
            }
            ir.status(200).json(result)
        })
    },

    modify: (yw, ir) => {

        const manager = {
            name: yw.body.name,
            email: yw.body.email,
            phone: yw.body.phone
        }

        if(yw.body.email === '' || yw.body.phone === '') {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү." })
        }

        ManagerModel.updateOne(yw.params.managerId, manager, (error, result) => {
            if(error) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            ir.status(200).json(result)
        })
    },

    removeSingle: (yw, ir) => {

        ManagerModel.deleteOne(yw.params.managerId, (error, result) => {
            if(error) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            ir.status(200).json(result)
        })
    }
}