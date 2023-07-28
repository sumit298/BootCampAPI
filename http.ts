import http from "http";

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

const server = http.createServer((req, res) => {
  let body: any = [];
  const { method, url } = req;
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response: any = {
        success: false,
        data: null,
        error: null
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = "Please add id and text for todos"
        } else {
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
