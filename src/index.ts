import app from "./app";
import config from "config";
import logger from "./utils/logger";

const port = config.get("port");

app.listen(port, async () => {
  logger.info(`Server is running http://localhost:${port}`);
});
