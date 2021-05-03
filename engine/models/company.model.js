const { connector } = require('../config/connector')

const CompanyModel = (company) => {
    this.name = company.name
    this.domain = company.domain
    this.phone = company.phone
}

CompanyModel.init = (result) => {

    let sql = `
    CREATE TABLE IF NOT EXISTS company(
        company_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL,
        domain VARCHAR(50) NOT NULL,
        phone INT NOT NULL,
        owner INT NOT NULL,
        CONSTRAINT ownerkey FOREIGN KEY (owner) REFERENCES manager(manager_id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ) ENGINE=INNODB
    `

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query(sql, (error, success) => {
            conn.release()
            if(error) {
                result(error, null)
                return
            }
            result(null, success)
        })
    })
}

CompanyModel.findDomain = (domain, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM company WHERE domain = ?", [domain], (fault, res) => {
            conn.release()
            if(fault) {
                result(fault, null)
                return
            }
            if(res.length > 0) {
                result(res, null)
                return
            }
            result(null, result)
        })
    })
}

CompanyModel.createOne = (newcompany, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT name FROM company WHERE name = ?", [newcompany.name], (fault, res) => {
            conn.release()
            if(fault) {
                result(fault, null)
                return
            }

            if(res.length > 0) {
                result(res, null)
                return
            }

            conn.query("INSERT INTO company SET ?", [newcompany], (error, success) => {
                conn.release()
                if(error) {
                    result(error, null)
                    return
                }
                result(null, success)
            })
        })
    })
}

CompanyModel.selectOne = (id, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM company WHERE company_id = ?", [id], (error, success) => {
            conn.release()
            if(error) {
                result(error, null)
                return
            }
            result(null, success)
        })
    })
}

CompanyModel.selectAll = (id, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM company WHERE owner = ?", [id], (error, success) => {
            conn.release()
            if(error) {
                result(error, null)
                return
            }
            result(null, success)
        })
    })
}

CompanyModel.updateOne = (id, company, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM company WHERE company_id = ?", [id], (fault, res) => {
            if(fault) {
                conn.release()
                result(fault, null)
                return
            }
            if(res.length == 0) {
                result(res, null)
                return
            }
            conn.query(
                "UPDATE company SET name = ?, domain = ?, phone = ? WHERE company_id = ?",
                [company.name, company.domain, company.phone, id],
                (error, success) => {
                    conn.release()
                    if(error) {
                        result(error, null)
                        return
                    }
                    result(null, success)
            })
        })
    })
}

CompanyModel.deleteOne = (id, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM company WHERE company_id = ?", [id], (fault, res) => {
            if(fault) {
                conn.release()
                result(fault, null)
                return
            }
            if(res.length == 0) {
                result(res, null)
                return
            }
            conn.query("DELETE FROM company WHERE company_id = ?", [id], (error, success) => {
                conn.release()
                if(error) {
                    result(error, null)
                    return
                }
                result(null, success)
            })
        })
    })
}

module.exports = { CompanyModel }