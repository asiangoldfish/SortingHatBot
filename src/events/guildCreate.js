const { Colors, Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
    name: Events.GuildCreate,
    once: true,
    execute(client) {
        // Check if all required roles exist in the guild
        let roleNames = [
            { name: "Slytherin", color: Colors.Green },
            { name: "Gryffindor", color: Colors.Red },
            { name: "Ravenclaw", color: Colors.Blue },
            { name: "Huffelpuff", color: Colors.Yellow },
        ];

        // Create roles when entering a new guild
        roleNames.forEach(role => {
            // Make sure that the role doesn't already exist
            if (!client.roles.cache.find(guildRole => guildRole.name === role.name)) {
                console.log(`Creating new role '${role.name}'`);

                client.roles.create({
                    name: role.name,
                    color: role.color,
                });
            }
        });

        // Register slash commands. This code is duplicate from src/deploy/deploy-dev-js
        const commands = [];
        // Fetch all command files from the commands directory
        const commandFiles = fs.readdirSync('./src/commands')
            .filter(file => file.endsWith('.js'));

        // Fetch the SlashCommandBUilder#toJSON() output of each command's data
        for (const file of commandFiles) {
            const command = require(`./../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        client.commands.set(commands).then(() => {
            console.log(`Commands deployed inn guild ${client.name}`);
        });
    }
}