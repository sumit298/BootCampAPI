"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const todos = [
    {
        id: 1,
        text: "Todo1",
    },
    {
        id: 2,
        text: "Todo2",
    },
    {
        id: 3,
        text: "Todo3",
    },
];
const server = http_1.default.createServer((req, res) => {
    let body = [];
    const { method, url } = req;
    req
        .on("data", (chunk) => {
        body.push(chunk);
    })
        .on("end", () => {
        body = Buffer.concat(body).toString();
        let status = 404;
        const response = {
            success: false,
            data: null,
            error: null
        };
        if (method === "GET" && url === "/todos") {
            status = 200;
            response.success = true;
            response.data = todos;
        }
        else if (method === "POST" && url === "/todos") {
            const { id, text } = JSON.parse(body);
            if (!id || !text) {
                status = 400;
                response.error = "Please add id and text for todos";
            }
            else {
                todos.push({ id, text });
                status = 201;
                response.success = true;
                response.data = todos;
            }
        }
        res.writeHead(status, {
            "Content-Type": "application/json",
            "X-Powered-By": "Node.js",
        });
        res.end(JSON.stringify(response));
    });
    // console.log(req.headers.authorization);
    //   console.log(headers, method, url);
});
const port = 5000;
server.listen(port, () => console.log(`Server up and running on port ${port}`));
