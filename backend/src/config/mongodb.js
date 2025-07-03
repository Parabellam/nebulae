export const MONGODB_CONFIG = {
  url: process.env.MONGODB_URL || "mongodb://root:example@mongo:27017/admin",
  dbName: process.env.MONGODB_DB_NAME || "nebulae_mongo_db",
};
