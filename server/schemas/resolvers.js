const { AuthenticationError } = require("apollo-server-express");
// const { saveBook } = require("../../client/src/utils/API");
// const { sign } = require("jsonwebtoken");
// const { login } = require("../controllers/user-controller");
const { User, Book } = require("../models");
// const { signToken } = require("../utils/auth");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("Books");
    },
    user: async (parent, { username, id }) => {
      return User.findOne({ username, id });
    },
    books: async ()
  },
};

Mutation: {
    addUser: async (parent, { username, email, password}) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError('No user with this email');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Email and password dont match');
        }

        const token = signToken(user);

        return { token, user };
    },
    saveBook: async (parent, { bookTitle }, context) => {
        if (context.user) {
            const book = await Book.create({
                bookTitle,
                bookAuthor: context.book.author,
            });

            await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: { books: book._id}}
            );
            return book;
        }
        throw new AuthenticationError('You need to be logged in');
    };
}

module.exports = resolvers;
