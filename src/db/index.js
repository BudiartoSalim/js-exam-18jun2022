module.exports = {
  init: async () => {
    const [
      sqlite,
    ] = await Promise.all([
      require('./sqlite').getConnection(),
    ]);

    return {
      sqlite,
    };
  },
};
