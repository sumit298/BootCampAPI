Learning NodeJS and its Workflows.

## Http module of core NodeJS

```js
// What is http
// => hyper text transfer protocol
// => Communication btween web servers and clients
// => HTTP Requests and responses
// => includes headers and body

const http = require("http");

// Hard coded Json Values
const pokemonAndFinalEvolutions = [
  {
    pokemon: "Bulbasaur",
    evolution: "Venasuar",
  },
  {
    pokemon: "Squirtle",
    evolution: "Blastoise",
  },
  {
    pokemon: "Charmander",
    evolution: "Charizard",
  },
  {
    pokemon: "Beldum",
    evolution: "Metagross",
  },
  {
    pokemon: "Gible",
    evolution: "Garchomp",
  },
];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-by": "Node.js",
  });
  let body = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(Buffer, body);
    });

  //   Todo Add request method with http
  res.write("<h1>Hello World</h1>");
  console.log(req.headers.authorization);
  console.log(req.headers);
  res.end(JSON.stringify({ success: true, data: pokemonAndFinalEvolutions }));
});

const PORT = 6000 || process.env.port;

server.listen(PORT, () => console.log("Server running on Port 6000"));
```

## Working on Bootcamp.

### API ENDPOINTS a.k.a Route Structure

- /api/v1/bootcamps
- /api/v1/courses
- /api/v1/reviews
- /api/v1/auth
- /api/v1/users

where v1 = version1

### Note:

we are keeping versions of API endpoints because suppose we want to update our api then we can make v2 -version2 without affecting v1 and if v2 is our new api then we can say v1 is deprecated use V2 onwards.

### Basic Routes

```js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
const app = express();

// For getting all bootcamps
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all Bootcamps" });
});

// For getting single bootcamp with its id
app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show the bootcamp with ${req.params.id}` });
});

// For adding a new bootcamp
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: `Add a new bootcamp.` });
});

// For updating bootcamp with id
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update the bootcamp with Id ${req.params.id}`,
  });
});

// For deleting bootcamp with id

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete the bootcamp with ${req.params.id}` });
});

const port = 5000 || process.env.PORT;

app.listen(port, () =>
  console.log(
    `Server up and running in ${process.env.NODE_ENV} mode at port ${port}.`
  )
);
```

### Note : Difference between PUT and PATCH

- The main difference between the PUT and PATCH method is that the PUT method uses the request URI to supply a modified version of the requested resource which replaces the original version of the resource, whereas the PATCH method supplies a set of instructions to modify the resource.

- In short - put replaces original content and patch modifies the original content.

### Router

For using Express Router outside the main file, write

```js
const express = require("express");
const router = express.Router();

// Router api endpoints Examples.
router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/:id", (req, res) => {
  res.send(`Hello ${req.params.id}`);
});

module.exports = router;
```

Now, for the main file, we would write

```js
const bootcamps = require("./Router/bootcamp");
// then use it with middlewares

app.use("/api/v1/bootcamps", bootcamps);
```

### Controllers

Controllers are the callback functions we passed to the `router` methods.

Why we need controllers ? I am sure, you are thinking about this?

Well in big api's or for reusing purposes or keeping routes file clean, we keep routes callback methods separate in Controllers folder.

In controllers folder we will create `bootcampController.js` file and in that file I am gonna export functions. for Ex.

```js
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};
```

### Note(optional):

Generally, `Get` route methods should kept public for users and `Post` i.e adding, `Put` i.e updating and `Delete` should be kept private for admin and managers. But it depends on context of the project.

Now in `Router/bootcamp.js`,

Just import that methods from Controllers and write.

```js
router.route("/").get(getBootcamps).post(postBootCamp);

router
  .route("/:id")
  .get(getBookCampById)
  .put(updateBootCampById)
  .delete(deleteBootCampById);
```


### MiddleWares

In Node.js, `middleware` refers to a critical concept that plays a central role in managing and processing incoming HTTP requests and outgoing HTTP responses. It acts as an intermediary layer between the web server and the application's business logic, allowing developers to add functionalities or perform specific tasks during the request-response lifecycle.

A simple and concise way to explain middleware in Node.js to an interviewer would be:

`Middleware` in Node.js is a layer of code that intercepts and processes HTTP requests and responses in web applications. It allows developers to add various functionalities, such as logging, authentication, error handling, and request parsing, without modifying the core application logic. Middleware functions are executed sequentially, and each middleware can modify the request or response before passing it along to the next middleware or the final request handler.

Node.js middleware is like a helpful assistant that stands between the web server and our application code. It manages incoming requests and outgoing responses, allowing us to add extra features and functionalities without messing up our main application logic. It's like a relay race, where each middleware does its part, passing the baton (the request and response) along the chain until the final handler takes over.

For ex. 

```js
  
  const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} `
    );
    next();
  };
  app.use(logger)

```