const toDoListRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/toDoList.json";

  // refactored helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // GET
  app.get("/getList", (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });

  // CREATE
  app.post("/addList", (req, res) => {
    console.log(req.body)
    readFile((data) => {
      // Note: this needs to be more robust for production use.
      const newitemId = Date.now().toString();
      data[newitemId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new to do item added");
      });
    }, true);
  });
};

module.exports = toDoListRoutes;
