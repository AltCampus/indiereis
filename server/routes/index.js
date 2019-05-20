const express = require('express');
const router = express.Router()
// const App = require('../../client/src/App')
router.get('/', (err, res)=>{
  res.status(200).render('index')
})
module.exports =router;