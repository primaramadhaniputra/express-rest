const { postData, updateData } = require('../../Controllers/V1/Controllers')

const schema = require('../../../helpers/user_schema')

const postValidasi = async (req, res) => {
   const result = await schema.validate({ username: req.body.username, password: req.body.password, email: req.body.email })

   if (!result.error) {
      postData(req, res)
   } else {

      res.send({
         code: 500,
         status: 'error',
         message: 'wrong value',
         data: result
      })
   }

}

const updateValidasi = async (req, res) => {
   const result = await schema.validate({ username: req.body.username, password: req.body.password, email: req.body.email })

   if (!result.error) {
      updateData(req, res)
   } else {

      res.send({
         code: 500,
         status: 'error',
         message: 'wrong value',
         data: result
      })
   }
}

module.exports = { postValidasi, updateValidasi }
