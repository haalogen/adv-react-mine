const Query = {
  // Shorthand syntax for
  // dogs: function () {}
  dogs(parent, args, ctx, info) {
    // Get dogs
    global.dogs = global.dogs || []
    return global.dogs
  },
};

module.exports = Query;
