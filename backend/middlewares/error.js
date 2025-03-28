module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  //   catch error in development
  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  //   catch error in production
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);

    // Mongoose validation fails
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      err.statusCode = 400;
    }

    // Occurs when Mongoose tries to cast an invalid value (e.g., an incorrect ObjectId).
    if (err.name == "CastError") {
      message = `Resource not found: ${err.path}`;
      error = new Error(message);
      err.statusCode = 400;
    }

    // Occurs when inserting a document with a duplicate value for a unique field.
    if (err.code == 11000) {
      let message = `Duplicate ${Object.keys(err.keyValue)} error`;
      error = new Error(message);
      err.statusCode = 400;
    }

    // Occurs when the JSON Web Token provided by the client is invalid.
    if (err.name == "JSONWebTokenError") {
      let message = `JSON Web Token is invalid. Try again`;
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.name == "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      error = new Error(message);
      err.statusCode = 400;
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
