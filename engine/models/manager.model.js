const { connector } = require('../config/connector')

const ManagerModel = (manager) => {
    this.name = manager.name
    this.email = manager.email
    this.phone = manager.phone
}

ManagerModel.init = (result) => {

    let sql = `
    CREATE TABLE IF NOT EXISTS manager(
        manager_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phone INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        last_login TIMESTAMP
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

ManagerModel.login = (creds, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            result(err, null)
            return
        }

        conn.query("SELECT * FROM manager WHERE email = ? AND phone = ?", [creds.email, creds.phone], (fault, res) => {
            conn.release()
            if(fault) {
                result(fault, null)
                return
            }
            result(null, res)
        })
    })
}

ManagerModel.createOne = (newmanager, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT email FROM manager WHERE email = ?", newmanager.email, (fault, res) => {
            if(fault) {
                conn.release()
                result(fault, null)
                return
            }
            if(res.length > 0) {
                result(res, null)
                return
            }
            conn.query("INSERT INTO manager SET ?", newmanager, (error, success) => {
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

ManagerModel.selectOne = (id, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM manager WHERE manager_id = ?", id, (error, success) => {
            conn.release()
            if(error) {
                result(error, null)
                return
            }
            result(null, success)
        })
    })
}

ManagerModel.selectAll = (result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM manager", (error, success) => {
            conn.release()
            if(error) {
                result(error, null)
                return
            }
            result(null, success)
        })
    })
}

ManagerModel.updateOne = (id, manager, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM manager WHERE manager_id = ?", [id], (fault, res) => {
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
                "UPDATE manager SET name = ?, email = ?, phone = ? WHERE manager_id = ?",
                [manager.name, manager.email, manager.phone, id],
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

ManagerModel.deleteOne = (id, result) => {

    connector.getConnection((err, conn) => {
        if(err) {
            conn.release()
            throw err
        }
        conn.query("SELECT * FROM manager WHERE manager_id = ?", [id], (fault, res) => {
            if(fault) {
                conn.release()
                result(fault, null)
                return
            }
            if(res.length == 0) {
                result(res, null)
                return
            }
            conn.query("DELETE FROM manager WHERE manager_id = ?", [id], (error, success) => {
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

module.exports = { ManagerModel }