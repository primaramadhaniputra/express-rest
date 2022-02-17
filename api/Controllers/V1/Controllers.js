const res = require('express/lib/response');
const { Faqs } = require('../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const postFaqs = async (req, res) => {


   const time = new Date().getTime()

   let { question, answer, status } = req.body
   quest = question.split(' ').join('-')
   const slug = quest
   try {

      const data = await Faqs.create({
         question,
         slug,
         answer,
         status,
      })


      res.send({
         code: 200,
         statusMsg: 'ok',
         message: 'data has been inserted',
         data: {
            question,
            answer,
            status,
            createdAt: time
         }
      })
   } catch (error) {
      res.send({
         code: 400,
         statusMsg: 'not ok',
         message: 'Errors Credentials'
      })
   }
}

const getFaqs = async (req, res) => {

   try {
      const data = await Faqs.findAll()
      const total = data.length
      res.send({
         code: 200,
         statusMsg: 'ok',
         data,
         meta: {
            total,
            totlaPage: 1,
            page: 1,
            perPage: 1
         }
      })
   } catch (error) {
      res.send({
         status: 500,
         statusMsg: 'not ok',
         message: 'internet errors'
      })
   }
}

const getDetailFaqs = async (req, res) => {
   try {
      const data = await Faqs.findOne({ where: { id: req.params.id_faqs } })
      res.send(
         {
            code: 200,
            statusMsg: "OK",
            data: {
               id: data.id,
               question: data.question,
               answer: data.answer,
               status: data.status,
               createdAt: data.createdAt
            }
         }
      )
   } catch (error) {
      res.send({
         code: 200,
         statusMsg: 'NOT OK'
      })
   }

}

const updateFaqs = async (req, res) => {
   const { question, answer } = req.body
   const id = req.params.id_faqs
   let slug = question.split(' ').join('-')
   const checkFaqs = await Faqs.findOne({ where: { id: id } })
   if (!checkFaqs) {
      return res.send({
         code: 404,
         statusMsg: 'not ok',
         message: 'faqs no found'
      })
   }
   try {
      const data = await Faqs.update({
         question, answer, slug
      }, {
         where: { id }
      })
      res.send({
         code: 200,
         statusMsg: 'ok',
         message: 'data has been updated',
         data: {
            question: req.body.question,
            answer: req.body.answer
         }
      })
   } catch (error) {
      res.send({
         code: 404,
         statusMsg: 'not ok',
         message: 'Errors credentials'
      })

   }
}

const deleteFaqs = async (req, res) => {
   const id = req.params.id_faqs
   const checkFaqs = await Faqs.findOne({ where: { id: id } })


   if (!checkFaqs) {
      return res.send({
         code: 404,
         statusMsg: 'not ok',
         message: 'faqs no found'
      })
   }
   try {
      const data = await Faqs.destroy({
         where: { id }
      })
      res.send({
         code: 200,
         statusMsg: "ok",
         message: 'faqs has been deleted',
         data
      })
   } catch (error) {
      res.send({
         code: 404,
         statusMsg: "not ok",
         message: 'faq not found'
      })
   }
}

module.exports = { postFaqs, getFaqs, getDetailFaqs, updateFaqs, deleteFaqs }

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




