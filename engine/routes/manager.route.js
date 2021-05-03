const rtr = require('express').Router()
const ManagerController = require('../controllers/manager.controller')

rtr.post('/login', ManagerController.signIn)
rtr.post('/create', ManagerController.createSingle)
rtr.get('/list', ManagerController.authToken, ManagerController.fetchAll)
rtr.get('/:managerId', ManagerController.authToken, ManagerController.fetchSingle)
rtr.put('/:managerId/update', ManagerController.authToken, ManagerController.modify)
rtr.delete('/:managerId/delete', ManagerController.authToken, ManagerController.removeSingle)

const ManagerRouter = rtr

module.exports = { ManagerRouter }