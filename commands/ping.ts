exports.run = async (client, message) => {
    /**This gets the current time */
    const otn = Math.round((new Date()).getTime());
    /**Sends a message in order to start counting the time it takes for a message to be sent. */
    const m = await message.channel.send({ embed: { title: 'Ping?', color: '#2ECC71' } });
    /**Gets the timestamp of the message that was sent. */
    const uts = message.createdTimestamp;
    /**Calculates the time taken */
    const ntn = Math.abs(otn - uts);
    /**Creates and embed for the previous message */
    var embed = {
        embed: {
            title: '🏓 Pong!',
            color: '#2ECC71',
            description: `API Latency: \` ${m.createdTimestamp - message.createdTimestamp}ms \`\nBot Latency: \` ${client.ws.ping}ms \``,
        }
    };
    /**Edits the message to display the time */
    m.edit(embed);
};