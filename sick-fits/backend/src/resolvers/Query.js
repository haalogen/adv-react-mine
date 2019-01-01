const { forwardTo } = require('prisma-binding')


const Query = {
  // Don't add any custom logic (auth, charge card, send email, etc).
  // Pass the query through to database
  items: forwardTo('db'),

  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // },

  // // Shorthand syntax for
  // // dogs: function () {}
  // dogs(parent, args, ctx, info) {
  //   // Get dogs
  //   global.dogs = global.dogs || []
  //   return global.dogs
  // },
};

module.exports = Query
