// Require slash commands
const fs = require("node:fs");
const path = require("node:path");

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// Require dotenv for secret token
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
client.commands = new Collection();

// Command listener
client.on(Events.InteractionCreate, async interaction => {
    // We make sure that only slash commands are listened to
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    // Attempt to execute the invoked command
    try {
        await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
	}

});

// Dynamically retrieve command files
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

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
})



// Login to Discord with client's token
client.login(process.env.DISCORD_TOKEN);