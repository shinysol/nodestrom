import { config } from "dotenv";

let isEnvLoaded = false;
function setIsEnvLoaded() {
  isEnvLoaded = true;
}
/**
 * dotenv safe config
 * @description
 * skip unnecessary .env reload
 */
function dotenvSafeConfig() {
  if (!isEnvLoaded) {
    config();
    setIsEnvLoaded();
  }
}
export { dotenvSafeConfig };
