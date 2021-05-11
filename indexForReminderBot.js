'use strict';

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready to remind!');
});

client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (message.author.id === '302050872383242240') {
        console.log('sent by user checked for');
        try {
            if (message.embeds[0].description.includes('Bump done')) {

                message.channel.messages.fetch({ limit: 2 })
                    .then(messages => { console.log(`Received ${messages.size} messages`); let bufferMessage = messages.last(); start(bufferMessage); })
                    .catch(console.error);


            }
        } catch (err) {
            console.log(err);
        }
    }

    function start(message) { setTimeout(function sendReminder() { message.channel.send(`${message.author.toString()} reminder`); }, 3600000); }
});



client.login('ODM0NjE1MDk5NDQ3OTY3Nzg2.YIDd4g.59zkw0i9XNEqUS06w4o9GNzsmXg');
