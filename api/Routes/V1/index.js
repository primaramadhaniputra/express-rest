const express = require('express');
const router = express.Router();
const { example, getData, deleteData, updateData } = require('../../Controllers/V1/Controllers')

// defaultRoutes = [
//    {
//       path: '/admin',
//       route: require('./admin')
//    },
//    {
//       path: '/owners',
//       route: require('./owner')
//    },
//    {
//       path: '/mining-contractors',
//       route: require('./api')
//    }
// ];

// defaultRoutes.forEach(route => {
// });
// router.use('/get')
// router.use('/', example);
router.post('/', example)
router.get('/', getData)
router.delete('/delete/:id', deleteData)
router.put('/update/:id', updateData)


module.exports = router;