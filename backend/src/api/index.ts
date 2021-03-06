import { connect } from "../data/db";
import path from "path";
import { setIsAPI } from "../globals";

require("dotenv").config({ path: path.resolve(process.cwd(), "api.env") });

function errorHandler(err) {
  console.error(err.stack || err); // tslint:disable-line:no-console
  process.exit(1);
}

process.on("unhandledRejection", errorHandler);

setIsAPI(true);

// Connect to the database before loading the rest of the code (that depend on the database connection)
console.log("Connecting to database..."); // tslint:disable-line
connect().then(() => {
  import("./start");
});
