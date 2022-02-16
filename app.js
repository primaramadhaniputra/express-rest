require('dotenv').config();

const express = require('express');
const app = express()
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
// import any routes here!
const firstVersionRoute = require('./api/Routes/V1');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// use routes here!
app.use('/v1', firstVersionRoute);
// app.use('/v1/post', async (req, res, next) => {
//    const token = req.header('token')

//    if (!token) {
//       return res.send('free course')
//    }
//    try {
//       const userToken = await jwt.verify(token, '1231asdfsafd4sdgt')
//       res.send('paid course')
//    } catch (error) {
//       res.send('free course')

//    }
//    // if ()

// }, (req, res) => {

// });

app.use(async (request, response, next) => next(Error('Internet Server Error')));
app.use(async (err, request, response, next) => {
   response.status(err['status'] || 500).send({
      code: err['status'] || 500,
      status: err['name'] || "Internal Server Error",
      message: err
   });
});

function print(path, layer) {
   if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
   } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
   } else if (layer.method) {
      console.log('%s /%s',
         layer.method.toUpperCase(),
         path.concat(split(layer.regexp)).filter(Boolean).join('/'))
   }
}

function split(thing) {
   if (typeof thing === 'string') {
      return thing.split('/')
   } else if (thing.fast_slash) {
      return ''
   } else {
      var match = thing.toString()
         .replace('\\/?', '')
         .replace('(?=\\/|$)', '$')
         .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
         ? match[1].replace(/\\(.)/g, '$1').split('/')
         : '<complex:' + thing.toString() + '>'
   }
}

app._router.stack.forEach(print.bind(null, []))

app.listen(3007, () => process.stdout.write(`Server listening at http://localhost:3007 \n`));