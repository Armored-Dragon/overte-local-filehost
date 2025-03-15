const http = require("http");
const log = require("easy-logger")
const server = require("./server")

const SERVER = http.createServer(server.listener);

const PORT = process.env.PORT || 3001;

SERVER.listen(PORT, () => { log.i(`Server is running on port ${PORT}`); });