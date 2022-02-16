const res = require('express/lib/response');
const { User } = require('../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

   // response.send(data)

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

   const token = await jwt.sign({ email: request.body.email }, '1231asdfsafd4sdgt', { expiresIn: 360000000 })

   password = await bcrypt.hash(password, 10)

   const data = await User.create({
      username: request.body.username,
      email: request.body.email,
      password
   })


   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil membuat user baru',
      data: data,
      token

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
   if (!user) {
      return response.send({
         status: 404,
         message: 'error credentials'

      })
   }
   const userPass = await bcrypt.compare(password, user.password);
   if (userPass) {


      response.send({
         code: 200,
         status: 'ok',
         message: 'berhasil Login',
         data: user
      })
   } else {
      res.send({
         status: '400',
         message: 'error'
      })
   }
}

module.exports = { getData, postData, deleteData, updateData, getDetail, login }