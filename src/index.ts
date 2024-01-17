import app from "./app";
import config from "config";
import logger from "./utils/logger";

const PORT = config.get("port");

app.listen(PORT, async () => {
  logger.info(`Auth service is running on port ${PORT}`);
});
