const express = require("express"),
  app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("Socket Connected");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
