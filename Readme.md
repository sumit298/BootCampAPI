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
app.use(logger);
```

### Connection to MongoDB atlas

```js
import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
```

For handling Error in the Promises, we used

```js
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`);
  // close the server and exit the process
  server.close(() => process.exit(1));
});
```

<!-- For Bootcamp schema see Bootcamps.ts -->

### CRUD using bootcamp schema

```js
// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
export const getBootcamps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: bootcamp.length,
      body: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
```

```js
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
export const getSingleBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.findById(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({
        success: false,
        error: "Bootcamp not found",
      });
    }
    res.status(200).json({
      success: true,
      body: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
```

```js
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// access   Private
export const updateBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // when we get our response, we want data to be updated data
        runValidators: true, // mongoose validators
      }
    );
    if (!bootcamp) {
      return res.status(404).json({
        success: false,
        error: "Bootcamp not found",
      });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Server error",
    });
  }
};
```

```js
// @desc    Delete Bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// access   Private
export const deleteBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, error: "Bootcamp not found" });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Server error",
    });
  }
};
```

### Custom Error Handling

- Instead of passing message and status code for error by ourself, let's set a custom error handler that does send statuscode and message according to the error occuring.

- We have defined custom class as ErrorResponse that extends Error interface for custom error properties in the `Utils/errorResponse.ts`

```js
class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
```

- In `MiddleWares/error.ts`

```js
// Import necessary modules and types
import { Request, NextFunction, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import mongoose from "mongoose";

// Define a custom interface that extends Error to include additional properties
export interface ErrnoException extends Error {
  errno?: number;
  code?: number;
  path?: string;
  syscall?: string;
  stack?: string;
}

// Error handling middleware function
export const errorHandler = (
  err:
    | ErrorResponse
    | mongoose.Error.CastError
    | ErrnoException
    | mongoose.Error.ValidationError, // Type union to handle multiple error types
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging purposes
  console.log(err);

  // Declare a variable to hold the error response
  let error: ErrorResponse;

  // Handle Mongoose "CastError" (invalid object ID)
  if (err instanceof mongoose.Error.CastError) {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404); // Create a custom error response with a "Not Found" status code
  }
  // Handle Mongoose "Duplicate key" error (code 11000)
  else if ((err as ErrnoException).code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400); // Create a custom error response with a "Bad Request" status code
  }
  // Handle Mongoose "Validation Error"
  else if (err instanceof mongoose.Error.ValidationError) {
    // Extract error messages from validation errors and join them into a single string
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400); // Create a custom error response with a "Bad Request" status code
  }
  // Handle other types of errors
  else {
    // Create a generic error response with the error message, or a default "Server Error" message
    error = { ...err } as ErrorResponse;
    error.message = err.message || "Server Error";
  }

  // Send the appropriate status code and error message in the response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};

```

And now in `controllers/bootcamps.ts` for catch method we are only passing `next(error)` for error handling and if bootcamp does not found, then we are passing custom ErrorResponse object with message and status code.
For ex.

```js
export const getBootCamp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bootcamp = await Bootcamps.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      body: bootcamp,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    // });
    next(error);
  }
};
```

### Async Await Middleware

This middleware function is designed to wrap asynchronous route handlers and simplify error handling for asynchronous operations. It uses the catch method of a resolved promise to catch any errors that might occur within the asynchronous route handler function and pass them to the Express next function for further error handling.

The asyncHandler function accepts a single argument fn, which is the asynchronous route handler function you want to wrap.

Inside the asyncHandler, a new middleware function is created that accepts the standard req, res, and next parameters.

The asynchronous route handler function fn(req, res, next) is called and wrapped in a Promise.resolve() to ensure it returns a promise. This allows you to catch any errors that might occur during its execution.

The .catch(next) part catches any errors that occur within the asynchronous operation and passes them to the Express next function. This way, the error will be caught by your error handling middleware and can be appropriately handled.

```js
import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
```

Use it in `bootcamp.ts`

```js
// @desc    Get all Bootcamps
// @route   GET /api/v1/bootcamps
// access   Public
export const getBootCamps = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBootcamp = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: allBootcamp.length,
      body: allBootcamp,
    });
  }
);

// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// access   Public
export const getBootCamp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bootcamp = await Bootcamps.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      body: bootcamp,
    });
  }
);
```

How to get slug from Bootcamps Schema
Pre middleware functions are executed one after another, when each middleware calls next.

```js
BootcampSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});
```
