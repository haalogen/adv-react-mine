const Mutation = {
  createDog(parent, args, ctx, info) {
    console.log(args);
    // Get dogs
    global.dogs = global.dogs || []
    // Create a dog!
    const newDog = { name: args.name }
    global.dogs.push(newDog)
    return newDog
  },
};

module.exports = Mutation;
