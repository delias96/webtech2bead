const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  const passwordOk = await bcrypt.compare(inputPassword, this.password);
  return passwordOk;
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 12, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;

    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
