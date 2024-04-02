const { decryptPassword, CreateToken } = require('../helper')
const Admin = require('../model/Admin')

class AdminController {
    login(data) {
        return new Promise(
            async (resolve, reject) => {
                const admin = await Admin.findOne({ email: data.email })
                if (admin) {
                    if (data.password == decryptPassword(admin.password)) {
                        const token = CreateToken(admin);
                        resolve({
                            msg: " admin login successfully",
                            status: 1,
                            admin,
                            token

                        })
                    } else {
                        reject({
                            msg: "Incorrect password",
                            status: 0
                        })
                    }
                } else {
                    reject({
                        msg: "Admin note defind",
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = AdminController;


