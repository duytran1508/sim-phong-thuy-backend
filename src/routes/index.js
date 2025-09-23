const UserRoutes = require("./UserRouter");
const CustomerRequestRoutes = require("./CustomerRequestRouter");
const FeedbackRoutes = require("./FeedbackRouter");
const BlogRoutes = require("./BlogRouter");
const StatsRoutes = require("./StatsRoutes");

const routes = (app) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/request", CustomerRequestRoutes);
  app.use("/api/feedback", FeedbackRoutes);
  app.use("/api/blog", BlogRoutes);
  app.use("/api/stats", StatsRoutes);
};

module.exports = routes;
