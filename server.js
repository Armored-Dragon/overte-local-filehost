const http = require("http");
const fs = require("fs");
const path = require("path");
const log = require("easy-logger")

const content_folder_name = "public"
const url_starting = `http://localhost:${process.env.PORT || 3001}`;
const headers = {
  "text": { "Content-Type": "text/plain" },
}

function listener(req, res) {
  let file_stream_error = false;

  // Log the request
  const request_url = `${url_starting}${req.url}`
  log.req(`${req.method} ${request_url}`);

  // Forward the request with the current timestamp as a query parameter
  // This will force the client to make a new request to the server
  const params = new URLSearchParams(new URL(request_url).search);

  if (!params.has('forwarded')) {
    const new_url = `${request_url}?forwarded=true&timestamp=${Date.now()}`

    log.i(`Forwarding request to timestamped URL: ${new_url}`);
    res.writeHead(302, { 'Location': new_url });
    res.end();
    return;
  }

  // Remove search and hash parameters from the URL
  const url_structure = new URL(request_url)
  const file_path = path.join(__dirname, content_folder_name, url_structure.pathname);
  const file_stream = fs.createReadStream(file_path);

  // If there is an error in the filestream
  file_stream.on("error", (error) => {
    fileStreamError(error, res);
    file_stream_error = true;
  });

  // Pipe the filestream to the response (Send the file)
  file_stream.pipe(res).on('close', () => {
    if (!file_stream_error) {
      log.i(`Sending ${url_structure.pathname}`);
    }
  });
}

function fileStreamError(error, res) {
  // File not found, does not exist!
  if (error.code === "ENOENT") {
    res.writeHead(404, headers.text);
    log.err(`File not found`)
    res.end("File not found");
    return;
  }
  else {
    // There was some kind of server error (catch all)
    res.writeHead(500, headers.text);
    res.end("Internal Server Error");
  }
}

module.exports = {
  listener: listener
};
