const UserRoutes = require("./UserRouter");
const CustomerRequestRoutes = require("./CustomerRequestRouter");
const FeedbackRoutes = require("./FeedbackRouter");
const BlogRoutes = require("./BlogRouter");

const routes = (app) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/request", CustomerRequestRoutes);
  app.use("/api/feedback", FeedbackRoutes);
  app.use("/api/blog", BlogRoutes);
};

module.exports = routes;
