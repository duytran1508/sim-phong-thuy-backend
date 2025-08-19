const UserRoutes = require("./UserRouter");
const UustomerRequestRoutes = require("./CustomerRequestRouter");
const FeedbackRoutes = require("./FeedbackRouter");
const BlogRoutes = require("./BlogRouter");

const routes = (app) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/khach-hang", UustomerRequestRoutes);
  app.use("/api/feedback", FeedbackRoutes);
  app.use("/api/blog", BlogRoutes);
};

module.exports = routes;
