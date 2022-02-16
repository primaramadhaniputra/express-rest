const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const { getData, deleteData, getDetail, login, postData } = require('../../Controllers/V1/Controllers');
const { postValidasi, updateValidasi } = require('../../validasi/user_validasi')


router.get('/users', getData)
router.get('/users/detail/:id', getDetail)
router.post('/users', postData)
router.post('/users/login', async (req, res, next) => {
   const token = req.header('token')
   if (!token) {
      return res.send({
         status: '404',
         message: 'errors credentials 1'
      })
   }
   try {
      const userToken = await jwt.verify(token, '1231asdfsafd4sdgt')
      next()
   } catch (error) {
      res.send({
         status: 400,
         message: 'errors credentials2 '
      })
   }

}, login)
router.delete('/users/delete/:id', deleteData)
router.put('/users/update/:id', updateValidasi)




module.exports = router;