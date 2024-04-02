const color = require("../model/Color");


class colorController {
    post(data) {
        return (
            new Promise(
                (res, rej) => {
                    try {
                        const colordata = new color(data)
                        colordata.save()
                            .then(
                                (success) => {
                                    res({
                                        status: 1,
                                        msg: 'data create successfully'
                                    })
                                }
                            ).catch(
                                (error) => {
                                    rej({
                                        status: 0,
                                        msg: "data note created"
                                    })
                                }
                            )
                    } catch (error) {
                        rej({
                            status: 0,
                            msg: "Internal server error"
                        })
                    }

                }
            )
        )
    }

    read(id) {
        return (
            new Promise(
                async (resolve, reject) => {
                    try {
                        let data = [];
                        if (id != undefined) {
                            data = await color.findById(id)
                        } else {
                            data = await color.find()

                        }
                        resolve({
                            status: 1,
                            msg: 'data found',
                            data
                        })
                    } catch (error) {
                        reject({
                            status: 0,
                            msg: "data note found"
                        })
                    }
                }
            )
        )
    }

    update(id, new_status) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        color.updateOne({ _id: id }, { status: new_status }).then(
                            (success) => {
                                resolve({
                                    status: 1,
                                    msg: "status updated successfully"
                                })
                            }
                        ).catch(
                            (error) => {
                                reject({
                                    status: 0,
                                    msg: 'Unable to the change status'
                                })
                            }
                        )
                    } catch (error) {
                        reject({
                            status: 0,
                            msg: 'Internal server error'
                        })
                    }
                }
            )
        )
    }

    delete(id) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        color.deleteOne({ _id: id }).then(
                            (success) => {
                                resolve({
                                    status: 1,
                                    msg: 'data deleted successfully'
                                })
                            }
                        ).catch(
                            (error) => {
                                reject({
                                    status: 0,
                                    msg: 'Unable to the data deleted'
                                })
                            }
                        )
                    } catch (error) {
                        reject({
                            status: 0,
                            msg: 'Internal serever error'
                        })
                    }
                }
            )
        )
    }

    edit(id, data) {
        return (
            new Promise(
                (resolve, reject) => {
                    try {
                        color.updateOne({ _id: id }, data).then(
                            (success) => {
                                resolve({
                                    status: 1,
                                    msg: "data update successfully"
                                })
                            }
                        ).catch(
                            (error) => {
                                reject({
                                    status: 0,
                                    msg: "Unable to the delete data"
                                })
                            }
                        )
                    } catch (error) {
                        reject({
                            status: 0,
                            msg: "Internal server error"
                        })
                    }
                }
            )
        )
    }
}


module.exports = colorController;