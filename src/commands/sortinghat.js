const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sorting-hat")
        .setDescription("Choose your Hogwarts house"),

    async execute(interaction) {
        await interaction.reply("Are you a true Slytherin or the bravest Gryffindor?");
    }
}