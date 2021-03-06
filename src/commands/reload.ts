exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.send('Must provide a command name to reload.');
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!client.commands.has(commandName)) {
      return message.send('That command does not exist');
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.ts`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.ts`);
    client.commands.set(commandName, props);
    message.channel.send(`The command ${commandName} has been reloaded`);
  };