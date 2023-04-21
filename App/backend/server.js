// Description: This is the backend server for the record app
// packages to import
const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv')
// middleware requres
const { errorHandler } = require('./middleware/errorMiddleware') // error handler
// my Files
const connectDB = require('./config/db') // connects to the database

dotenv.config() // loads the environment variables
const PORT = process.env.PORT || 5000 // Port number
connectDB() // connects to the database

// initialize express
const app = express()

app.use(express.json()) // allows us to use json data
app.use(express.urlencoded({ extended: true })) // allows us to use url encoded data

app.use('/api/collection', require('./routes/albumCollectionRoutes')) // routes for albums
app.use('/api/users', require('./routes/userRoutes')) // routes for users
app.use('/api/search' , require('./routes/discogRoutes')) // routes for discogs search

// serve front end
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('please set to production'))
}

// error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
