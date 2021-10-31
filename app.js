const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
const workspaceRouter = require('./routes/workspaces')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(cookieParser())

app.use(
  session({
    secret: 'DH - Projeto Integrador - BoardHero',
    resave: false,
    saveUninitialized: true
  })
)

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.use('/workspace', workspaceRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
