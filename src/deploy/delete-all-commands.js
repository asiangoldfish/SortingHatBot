const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

// Require dotenv for secret token
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const commands = [];
// Fetch all command files from the commands directory
const commandFiles = fs .readdirSync('./src/commands')
                        .filter(file => file.endsWith('.js'));

// Fetch the SlashCommandBUilder#toJSON() output of each command's data
for (const file of commandFiles) {
    const command = require(`./../commands/${file}`);
    commands.push(command.data.toJSON());
}
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Delete commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            //Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [] },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands`);
    } catch (error) {
        console.error(error);
    }
})();