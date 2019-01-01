const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        // title: args.title, etc
        ...args,
      }
    }, info) /* "info" says what to return as a result */

    // console.log(item)

    return item
  },
  // createDog(parent, args, ctx, info) {
  //   console.log(args);
  //   // Get dogs
  //   global.dogs = global.dogs || []
  //   // Create a dog!
  //   const newDog = { name: args.name }
  //   global.dogs.push(newDog)
  //   return newDog
  // },
};

module.exports = Mutation
