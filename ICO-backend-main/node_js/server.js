require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
var http = require('http');
var apiLogs = require('api-logs')
const app = express();
const statusCode = require("./config/statuscode");
var apirouter = require('./routes/apirouter');
const { getEthPrice,batchWhiteListUser,getEthBalance } = require("./helpers/common");
var corsOptions = {
  origin: "*"
  //origin: ['https://mcube.7bits.in', 'https://mcubefronted.7bits.in','http://localhost:3001','http://localhost:3000']
};

const db = require("./models");
db.sequelize.sync();

let apilogOptions = {
  env: ['dev', 'uat'],
  logdir: 'logs',
  responseBody: 'true',
  maxExecTime: 60000,
  Filename: "apilogs",
  timestamp: '%Y-%m-%d',
  maxFiles: '1'
};
//app.use(apiLogs(apilogOptions));

const logger = require('./controller/logger');
//const { Console } = require("console");
//Use For check json format
app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send('Invalid JSON Format');
      throw Error(e);
    }
  }
}));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//for CORS
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "*");
	req.header("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Static API." });
});
app.use("/api", apirouter);
app.use((error, request, response, next) => {
	response.status(statusCode.SERVER_ERROR).send();
	next();
});

 
// Schedule tasks to be run on the server.
cron.schedule('0 * * * *', function() {
  console.log('running a task every minute '+ Date.now());
  getEthPrice();
  batchWhiteListUser()
});

  // set port, listen for requests
const port = process.env.PORT || 3001;
/* app.listen(PORT, () => {
logger.info(`Server is running on port ${PORT}.`);
});
 */
app.set('port', port);
var httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  
}

 