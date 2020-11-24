const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const port = config.get('port') || 5000
const app = express()

app.use(express.json())

// Send static files & index.html in Production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

async function start () {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(port, () => console.log(`App has been started on port: ${port}`))
  } catch (err) {
    console.error('Server Error', err.message)
    process.exit(1)
  }
}

start()
