const res = require('express/lib/response');
const { User } = require('../../../models');
const generator = require('generate-password');
const jwt = require('jsonwebtoken');

const getData = async (request, response) => {
   try {
      const data = await User.findAll()
      response.send({
         code: 200,
         status: 'ok',
         message: 'berhasil menampilkan data',
         data
      })
   } catch (error) {
      res.send({
         code: 500,
         status: 'not ok',
         message: 'internal server error'
      })
   }
}
const getDetail = async (request, response) => {
   const data = await User.findOne({ where: { id: request.params.id } })

   if (data) {
      response.send({
         code: 200,
         status: 'ok',
         message: 'berhasil menampilkan data',
         data
      })
   } else {
      response.send({
         code: 404,
         status: 'error',
         message: 'user not found'
      })
   }

}

const postData = async function (request, response) {
   let password = request.body.password


   password = generator.generate({
      length: 10,
      numbers: true
   });

   const test = await User.create({
      username: request.body.username,
      email: request.body.email,
      password
   })


   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil membuat user baru',
      data: test
   })

};

const deleteData = async (request, response) => {
   const data = await User.destroy({
      where: {
         id: request.params.id
      }
   })
   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil menghapus user baru',
      data
   })

}


const updateData = async (request, response) => {

   const { username, email, password } = request.body

   const data = await User.update({
      username, email, password
   }, {
      where: {
         id: request.params.id
      }
   })
   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil mengubah data user',
      data
   })

}


const login = async (request, response) => {
   let { email, username, password } = request.body

   const user = await User.findOne({
      where: { email: email }
   })
   const token = await jwt.sign({ email }, '1231asdfsafd4sdgt', { expiresIn: 360000000 })
   if (!user) {
      return response.send({
         code: 404,
         status: 'not ok',
         message: 'Error credentials',
      })
   }
   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil Login',
      token,
      data: user
   })
}

module.exports = { getData, postData, deleteData, updateData, getDetail, login }