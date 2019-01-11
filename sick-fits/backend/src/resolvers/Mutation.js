const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    // "ctx.db" -- access to Prisma API
    const item = await ctx.db.mutation.createItem({
      data: {
        // title: args.title, etc
        ...args,
      }
    }, info) /* "info" says what to return as a result */

    // console.log(item)

    return item
  },

  updateItem(parent, args, ctx, info) {
    // First take copy of the updates
    const updates = { ...args }
    // Remove the ID from updates (we don't want to update ID)
    delete updates.id
    // Run the update method
    return ctx.db.mutation.updateItem({
      // updateItem(data: ItemUpdateInput!, where: ItemWhereUniqueInput!): Item
      data: updates,
      where: { id: args.id }
    }, info)

  }
};

module.exports = Mutation
