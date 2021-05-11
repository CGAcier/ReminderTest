'use strict';

// Import the discord.js module
const Discord = require('discord.js');

const allIntents = Discord.Intents.NON_PRIVILEGED;
const client = new Discord.Client({ intents: allIntents });

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready to remind (test)!');
});

client.on('message', message => {

    message.member.pend
    
    //MANUAL REMINDER
    if (message.content.startsWith('!remindmein')) {
        console.log('Manual reminder logged');
    
        try {
            const arrToSplitInitialMessageIntoCommandAndTime = message.content.split(" ");
            const timeArray = arrToSplitInitialMessageIntoCommandAndTime[1].split(":");
            const milliseconds = Number(timeArray[0]) * 3600000 + Number(timeArray[1]) * 60000 + Number(timeArray[2]) * 1000;
            message.channel.send(`Got it. I will remind you in ` + msToTime3(milliseconds));
            setTimeout(sendManualReminder , milliseconds);
        } catch (err) {
            console.log(err);
        }
    }

    //WHOISYOURDADDY
    if (message.content === "!whoisyourdaddy") {
        if (message.author.id === '234018417043046400') {
            message.channel.send('You are :woozy_face:');
            return;
        } else {
            message.channel.send('Ew, go away :rolling_eyes:');
            return;
        }
    }

    //OPT-IN
    if (message.content === "!opt-in") {
        console.log('Opt-in Logged')

        let myRole = message.guild.roles.cache.find(role => role.name === "Reminder");

        if (message.member.roles.cache.has(myRole)) {
            console.log('Error member already has role');
            message.channel.send('Seems like I am already going to remind you');
            return;
        }

        message.channel.send(`Got it. From now on I will remind you. Thank you!`);
        try {
            message.member.roles.add(myRole);
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
        return;
    }
    
    //OPT-OUT
    if (message.content === '!opt-out') {
        console.log('Opt-out logged')

        let myRole = message.guild.roles.cache.find(role => role.name === "Reminder");

        if (!(message.member.roles.cache.has(myRole))) {
            console.log('Error, user already doesnt have role');
            message.channel.send("You are already not recieving reminders")
            return;
        }

        message.channel.send(`Got it. From now on I will no longer remind you.`);
        try {
            message.member.roles.remove(myRole);
        } catch (err) {
            console.log(err);
            message.channel.send(err);
        }
        return;
    }

    //CHECK FOR DISBOARD BUMP
    if (message.author.id === '302050872383242240') {
        
        console.log('sent by user checked for');
       
        try {
            if (message.embeds[0].description.includes('Bump done')) {

                message.channel.messages.fetch({ limit: 2 })
                    .then(messages => { console.log(`Received ${messages.size} messages`); let bufferMessage = messages.last(); start(bufferMessage); })
                    .catch(console.error);
            }
        } catch (err) {
            message.channel.send(err);
            console.log(err);
        }
        return;
    }

    function sendReminder() { message.channel.send(`Hey there <@&$(myRole)>. This is an automated reminder that the server can be bumped. To enable or disable reminders use !opt-in or !opt-out`); }
    function sendManualReminder() { message.channel.send(`Hey there <@&$(myRole)>. This is the manual reminder that you asked for. Use !remindmein hh:mm:ss`); }
    function start(message) { setTimeout(sendReminder, 7200000); }

    function msToTime(s) {
        // Pad to 2 or 3 digits, default is 2
      var pad = (n, z = 2) => ('00' + n).slice(-z);
      return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
    }

    function msToTime2(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }

      function msToTime3(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sec";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Days"
      }
      
});

// The data for our command
const commandData = {
    name: 'echo',
    description: 'Replies with your input!',
    options: [{
      name: 'input',
      type: 'STRING',
      description: 'The input which should be echoed back',
      required: true,
    }],
  };
  
  client.once('ready', () => {
    // Creating a global command
    client.application.commands.create(commandData);
  
    // Creating a guild-specific command
    client.guilds.cache.get('400459019321606145').commands.create(commandData);
  });

  client.on('interaction', interaction => {
    // If the interaction isn't a slash command, return
    if (!interaction.isCommand()) return;
  
    // Check if it is the correct command
    if (interaction.commandName === 'echo') {
      // Get the input of the user
      const input = interaction.options[0].value;
      // Reply to the command
      interaction.reply(input);
    }
  });




client.login('ODQwNzQ2MTYwODA5NDQzMzQ4.YJcr4Q.8EiIXRNZXERjUx3zj0nKBam5t1o');
