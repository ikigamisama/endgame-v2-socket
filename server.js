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
  socket.on("newArenaPlayers", (data) => {
    io.emit("new_arena_players", data);
  });

  socket.on("logoutDrafters", (data) => {
    io.emit("remove-arena-players", data);
  });

  socket.on("arenaPlayersProceed", (data) => {
    io.emit("drafters-proceed", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
