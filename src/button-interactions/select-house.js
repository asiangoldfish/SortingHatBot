const { Colors } = require('discord.js');

module.exports = {
    name: 'select-house',
    commandName: 'sortinghat-buttons',

    async execute(interaction) {
        let member = interaction.member;

        // Check if the guild has all roles
        let roleNames = [
            "Slytherin",
            "Gryffindor",
            "Ravenclaw",
            "Huffelpuff",
        ]

        let roles = [];


        // Find roles in guild by roleNames and add them to 'roles'
        roleNames.forEach((name) => {
            roles.push(
                interaction.guild.roles.cache.find(
                    role => role.name === name
                )
            )
        });

        // Add the executor the role as the selected house
        let role = interaction.guild.roles.cache.find(role => role.name === interaction.customId);

        // Add role to member if they don't already have it
        if (interaction.member.roles.cache.has(role.id)) {
            await interaction.update(`You already are a ${role.name}!`);
        } else {
            // Remove the old role from the user
            roles.forEach(role => {
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role).catch(() => {
                        interaction.reply({
                            content: "I do not have permissions to assign you to a new house. Please let a server admin know to fix this.",
                            ephemeral: true
                        })
                    });
                }

            });

            await member.roles.add(role);

            await interaction.message.edit({ components: [] });
            await interaction.update(`Congratulations! You have become a member of the House of ${role.name}!`);

        }
    },
}