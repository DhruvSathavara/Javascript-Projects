const http = require("http");
const express = require("express");

const socketio = require("socket.io");

const randomColor = require("randomcolor");
const createBoard = require("./create-board");
const creatCooldown = require("./create-cooldown");

const app = express();
app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

const { clear, getBoard, makeTurn } = createBoard(20);

io.on("connection", (sock) => {
    const color = randomColor();
    const cooldown = creatCooldown(2000);

    sock.emit("board", getBoard());
  
    sock.on("message", (text) => io.emit("message", text))

    sock.on("turn", ({ x, y }) => {

        if (cooldown()) {
            const playerWon = makeTurn(x, y, color);
            io.emit("turn", { x, y, color });

            if (playerWon) {
                sock.emit("message", "You won!");
                io.emit("message", "New round");
                clear();
                io.emit("board");
            }
        };

    });
});
server.on("error", (err) => {
    console.error(err);
});

server.listen(8000, () => {
    console.log("server is ready");
});