const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

// Get full URI from config
const uri = config.get("MONGODB_URI");

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => dbgr("✅ MongoDB connected successfully."))
  .catch(err => dbgr("❌ MongoDB connection error:", err));

module.exports = mongoose.connection;
