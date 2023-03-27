// load up our new route for toDoList
const toDoListRoutes = require("./toDoList");

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  // run our toDoList route module here to complete the wire up
  toDoListRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;
