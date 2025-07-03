//setting up a middleware to access request type and url
// not used in the application 
// used a 3rd party package called "morgan"


//@desc    Logs request to console
const logger = (req, res, next) => {
    console.log(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    );
    next();
};

module.exports = logger;