const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "subdirectory", req.url);
  const fileStream = fs.createReadStream(filePath);

  fileStream.on("error", (error) => {
    if (error.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  fileStream.pipe(res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
