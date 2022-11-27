const { AuthenticationError } = require("apollo-server-express");
// const { saveBook } = require("../../client/src/utils/API");
// const { sign } = require("jsonwebtoken");
// const { login } = require("../controllers/user-controller");
const { User, Book } = require("../models");
// const { signToken } = require("../utils/auth");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw new AuthenticationError("You need to log in first");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      // or {username, email, password }
      const user = await User.create(args); // or username, email, password
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Email and password dont match");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { userId, book }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
            { _id: userId },
            {
                $addToSet: { books: book },
            },
            {
                new: true,
                runValidators: true,
            }
        );
        }
      throw new AuthenticationError("You need to be logged in");
    },

    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user_id },
          { $pull: { books: book } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};
module.exports = resolvers;
