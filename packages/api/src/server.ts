import app from "./app";
import connectToMongo from "./config/database/mongo";

const PORT = process.env.PORT || 5000;

connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Listening on port ${PORT}`,
        process.env.NODE_ENV,
        "is dev =",
        process.env.DEV
      );
    });
  })
  .catch((e) => {
    console.log(`Error ${JSON.stringify(e)}`);
  });
