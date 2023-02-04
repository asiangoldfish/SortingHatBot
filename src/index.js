/* 
 * Native NodeJS modules for file management. We use these for the following:
 *  - Fetching commands from "src/commands" directory
*/
const fs = require("node:fs");
const path = require("node:path");

// Necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Library to work with secrets. The secret is stored in ".env" file
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new discord bot client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a new collection for slash commands
client.commands = new Collection();

// Dynamically retrieve commands from "src/commands"
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs .readdirSync(commandsPath)
                        .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the
    // value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
    }
}

// Dynamically retrieve events from "src/events"
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Login to Discord with client's token
client.login(process.env.DISCORD_TOKEN);