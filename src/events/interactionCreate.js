const {
    Events,
} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,

    // Execute command
    async execute(interaction) {
        // Ignore any other chat commands that's not slash commands

        // Check if the interaction is a command and executes it
        if (interaction.isCommand()) {
            // Retrieve the slash command from the user
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

        // If the interaction is a button, then we reply promptly
        } else if (interaction.isButton()) {
            // Add the executor the role as the selected house
            let role = interaction.guild.roles.cache.find(role => role.name === interaction.customId);
            let member = interaction.member

            // If role doesn't exist, then output error message
            if (!role) {
                await interaction.reply(`House of ${interaction.customId} doesn't exist!`);
                return;
            }

            // Add role to member if they don't already have it
            if (interaction.member.roles.cache.has(role.id)) {
                await interaction.reply(`You already are a ${role.name}!`);
            } else {
                // Before adding a new house, we remove the previous house
                let roles = [
                    interaction.guild.roles.cache.find(role => role.name === "Slytherin"),
                    interaction.guild.roles.cache.find(role => role.name === "Gryffindor"),
                    interaction.guild.roles.cache.find(role => role.name === "Ravenclaw"),
                    interaction.guild.roles.cache.find(role => role.name === "Huffelpuff"),
                ];

                roles.forEach(role => {
                    if (member.roles.cache.has(role.id)) {
                        member.roles.remove(role).catch(console.error);
                    }
                });

                await member.roles.add(role);
                await interaction.reply(`Congratulations! You have become a member of the House of ${role.name}!`);
            }
        
        // Return if unknown interaction
        } else {
            return;
        }
    }
}