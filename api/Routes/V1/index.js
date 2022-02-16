const express = require('express');
const router = express.Router();
const { getData, deleteData, getDetail, login } = require('../../Controllers/V1/Controllers');
const { postValidasi, updateValidasi } = require('../../validasi/user_validasi')


router.get('/users', getData)
router.get('/users/detail/:id', getDetail)
router.post('/users', postValidasi)
router.post('/users/login', login)
router.delete('/users/delete/:id', deleteData)
router.put('/users/update/:id', updateValidasi)




module.exports = router;