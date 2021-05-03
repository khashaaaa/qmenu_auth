const rtr = require('express').Router()
const CompanyController = require('../controllers/company.controller')
const ManagerController = require('../controllers/manager.controller')

rtr.get('/:domain/find', ManagerController.authToken, CompanyController.searchDomain)
rtr.post('/create', ManagerController.authToken, CompanyController.createSingle)
rtr.get('/:managerId/list', ManagerController.authToken, CompanyController.fetchAll)
rtr.get('/:companyId', ManagerController.authToken, CompanyController.fetchSingle)
rtr.put('/:companyId/update', ManagerController.authToken, CompanyController.modify)
rtr.delete('/:companyId/delete', ManagerController.authToken, CompanyController.removeSingle)

const CompanyRouter = rtr

module.exports = { CompanyRouter }