// ? This is the backend server for the record app
/// packages to import ///
const express = require("express");
const app = express(); // express app
const server = require("http").createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5174";

const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent with requests
  },
});

const PORT = process.env.PORT || 5000; // Port number
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");

/// Middleware Section ///

app.use(express.json()); // allows us to use json data
app.use(express.urlencoded({ extended: false })); // allows us to use url encoded data
// middleware requres
const { errorHandler } = require("./middleware/errorMiddleware"); // error handler
// error handler

/// Database Section ///
const connectDB = require("./config/db"); // connects to the database
dotenv.config(); // loads the environment variables
connectDB(); // connects to the database

const albumUserMap = new Map(); // map of album ids to users

/// Routing Section ///
app.use("/api/collection", require("./routes/albumCollectionRoutes")); // routes for albums
app.use("/api/users", require("./routes/userRoutes")); // routes for users
app.use("/api/search", require("./routes/discogRoutes")); // routes for discogs search

app.use(errorHandler);

/// Socket IO Section ///
// add a socket.io connection listener
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  //* joinAlbumRoom - Listens for a user to join a room
  //? room === discogsId
  //? id === userId
  //? join room listener
  socket.on("joinAlbumRoom", (data) => {
    const { room, id } = data;
    console.log(`user ${id} joined room ${room}`);
    socket.join(room);
    socket.join(id);

    if (!albumUserMap.has(room)) {
      albumUserMap.set(room, new Set([id]));
    } else {
      albumUserMap.get(room).add(id);
    }
  });

  // TODO remove user from room when they delete the album

  //* listen for events from client
  socket.on("emitCustomFieldUpdate", (data) => {
    const { room, id, key, value } = data;

    console.log(
      `in room ${room} received update from ${id} for custom field ${key} with value ${value}`
    );

    const albumUsers = albumUserMap.get(room) || new Set(); // get the set of users in the room

    //? if the user is the only one in the room, don't send the update
    if (albumUsers.size === 1 && albumUsers.has(id)) {
      console.log("user is the only one in the room, not sending update");
      return;
    }

    //? emit the updated custom field data to all connected clients in the room
    albumUsers.forEach((userId) => {
      if (userId !== id) {
        console.log(`userId: ${userId} id: ${id}`);
        console.log(
          `sending update to ${userId} params: ${room}, ${key}, ${value}`
        );

        io.to(userId).emit("notifyCustomFieldUpdate", {
          discogId: room,
          key: key,
          value: value,
        });
      }
    });
  });

  // disconnect listener
  socket.on("disconnect", (reason) => {
    console.log(`user disconnected: ${reason}`);
  });
});

/// Serve Application ///
// serve front end
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("please set to production"));
}

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
