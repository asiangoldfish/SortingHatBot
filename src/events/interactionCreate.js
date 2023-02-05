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
            const button = interaction.client.buttons.get('sortinghat-buttons');
            try {
                await button.execute(interaction)
            } catch (error) {
                console.log("error");
            }
            
            
        // Return if unknown interaction
        } else {
            return;
        }
    }
}