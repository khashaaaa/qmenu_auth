const { CompanyModel } = require('../models/company.model')

module.exports = {

    searchDomain: (yw, ir) => {

        CompanyModel.findDomain(yw.params.domain, (error, result) => {
            if(error) {
                return ir.status(409).json({ warning: "Мэдээлэл давхцаж байна." })
            }
            ir.status(200).json(result)
        })
    },

    createSingle: (yw, ir) => {

        const company = {
            name: yw.body.name,
            domain: yw.body.domain,
            phone: yw.body.phone,
            owner: yw.body.owner
        }

        if(yw.body.name === '' || yw.body.domain === '' || yw.body.phone === '' || yw.body.owner === '') {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү." })
        }

        CompanyModel.createOne(company, (error, result) => {
            if(error) {
                return ir.status(409).json({ warning: "Мэдээлэл давхцаж байна." })
            }
            ir.status(201).json(result)
        })
    },

    fetchSingle: (yw, ir) => {
        
        CompanyModel.selectOne(yw.params.companyId, (error, result) => {
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

        CompanyModel.selectAll(yw.params.managerId, (error, result) => {
            if(error) {
                return ir.status(500).json(error)
            }
            ir.status(200).json(result)
        })
    },

    modify: (yw, ir) => {

        const company = {
            name: yw.body.name,
            domain: yw.body.domain,
            phone: yw.body.phone
        }

        if(yw.body.domain === '' || yw.body.phone === '') {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү." })
        }

        CompanyModel.updateOne(yw.params.companyId, company, (error, result) => {
            if(error) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            ir.status(200).json(result)
        })
    },

    removeSingle: (yw, ir) => {

        CompanyModel.deleteOne(yw.params.companyId, (error, result) => {
            if(error) {
                return ir.status(404).json({ warning: "Мэдээлэл байхгүй байна." })
            }
            ir.status(200).json(result)
        })
    }
}