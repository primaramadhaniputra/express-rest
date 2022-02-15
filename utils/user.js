// const res = require('express/lib/response');
// const { User } = require('../models');

// const getData = async (request, response) => {
//    const data = await User.findAll()
//    response.send({
//       code: 200,
//       status: 'ok',
//       message: 'berhasil menampilkan data',
//       data
//    })
// }
// const getDetail = async (request, response) => {

//    const data = await User.findOne({ where: { id: request.params.id } })

//    if (data) {
//       response.send(data)
//    } else {
//       response.send({
//          code: 404,
//          status: 'error',
//          message: 'user not found'
//       })
//    }

// }

// const postData = async function (request, response) {
//    const test = await User.create({
//       username: request.body.username,
//       email: request.body.email,
//       password: request.body.password,
//    })
//    response.send({
//       code: 200,
//       status: 'ok',
//       message: 'berhasil membuat user baru',
//       data: test
//    })
// };

// const deleteData = async (request, response) => {
//    const data = await User.destroy({
//       where: {
//          id: request.params.id
//       }
//    })
//    response.send({
//       code: 200,
//       status: 'ok',
//       message: 'berhasil menghapus user baru',
//       data
//    })

// }


// const updateData = async (request, response) => {

//    const { username, email, password } = request.body

//    const data = await User.update({
//       username, email, password
//    }, {
//       where: {
//          id: request.params.id
//       }
//    })
//    response.send({
//       code: 200,
//       status: 'ok',
//       message: 'berhasil mengubah data user',
//       data
//    })

// }


// module.exports = { getData, postData, deleteData, updateData, getDetail }