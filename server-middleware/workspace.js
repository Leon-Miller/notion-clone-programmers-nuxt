require('dotenv').config()
const express = require('express')
const axios = require('axios')

const app = express()
const { API_ENDPOINT, API_KEY } = process.env

app.use(express.json())
app.post('/', async (req, res) => {
  const options = req.body

  const { id = '', method, body } = options
  const { data } = await axios({
    url: `${API_ENDPOINT}${id}`,
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-username': API_KEY
    },
    data: body
  })

  res.status(200).json(data)
})

module.exports = app