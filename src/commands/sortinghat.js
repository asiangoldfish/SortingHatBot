const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        // Command name
        .setName("sortinghat-buttons")

        // Command description
        .setDescription("Choose your Hogwarts house"),

    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('Slytherin')
                    .setLabel('Slytherin')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('Gryffindor')
                    .setLabel('Gryffindor')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('Ravenclaw')
                    .setLabel('Ravenclaw')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('Huffelpuff')
                    .setLabel('Huffelpuff')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({
            content: 'Pick your house!',
            components: [row],
        });
    }
};