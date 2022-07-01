module.exports = {
  apps: [
    {
      name: "arvoredetestes-api",
      script: "src/index.ts",
      kill_timeout: 3000,
      listen_timeout: 3000,
      exec_mode: "cluster",
      instances: 1,
      /*      env: {
        NODE_ENV: "production",
        DEV: false,
        JWT_SECRET: "9BnMGEnDaEk5",
        JWT_LIFE: 2630000,
        REFRESH_JWT_SECRET: "u7u3CUW49Gv4",
        REFRESH_JWT_LIFE: 2630000,
        MONGODB_URL:
          "mongodb+srv://arvoredeteste:3ikfBkkexqjg0k7k@cluster0.ac84s.mongodb.net/arvoredeteste?retryWrites=true&w=majority",
        MONGO_URL:
          "cluster0.ac84s.mongodb.net/arvoredeteste?retryWrites=true&w=majority",
        MONGO_PORT: 27017,
        MONGO_USER: "arvoredeteste",
        MONGO_PASS: "3ikfBkkexqjg0k7k",
        MONGO_DB: "arvoredeteste",
      },*/
    },
  ],
};
