
const { User } = require('../../../models')

const example = async function (request, response) {
   // const result = exampleRequest.validateAsync(request.body);
   const test = await User.create({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
   })
   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil membuat user baru',
      data: test
   })
   // response.send('testinggg')
   // const result = exampleRequest.validate(request.body);
};

const getData = async (request, response) => {
   const data = await User.findAll()
   response.send({
      code: 200,
      status: 'ok',
      message: 'berhasil menampilkan data',
      data
   })

}
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

module.exports = { example, getData, deleteData, updateData }
