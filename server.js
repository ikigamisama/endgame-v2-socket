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

  socket.on("backArena", (data) => {
    io.emit("back-arena", data);
  });

  socket.on("draftTimer", (data) => {
    if (data.isContinuingCooldown === false) {
      io.emit(data.function, data);
    }
  });

  socket.on("bossDraftInit", (data) => {
    io.emit(data.function, data);
  });

  socket.on("redraft", (data) => {
    io.emit(data.function, data);
  });

  socket.on("rerollDecision", (data) => {
    io.emit(data.function, data);
  });

  socket.on("characterDraft", (data) => {
    let payload = {};
    if (data.sequence.length + 1 !== data.sequenceIndex) {
      payload = {
        draft_id: data.draft_id,
        sequence:
          data.sequenceList.length !== data.sequenceIndex
            ? data.sequenceList[data.sequenceIndex]
            : null,
        sequenceIndex: data.sequenceIndex,
        isStartingDraft: data.isStartingDraft,
        characterID: data.isStartingDraft === true ? null : data.characterID,
      };
    } else {
      payload = {
        draft_id: data.draft_id,
        sequence: null,
        sequenceIndex: null,
        isStartingDraft: null,
        characterID: null,
      };
    }
    io.emit(data.function, payload);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
