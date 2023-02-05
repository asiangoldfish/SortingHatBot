# Development Setup

# Table of Content
- [Prerequisites](#prerequisites)
- [Setting up the Environment](#setting-up-the-environment)

# Prerequisites
Sorting Hat Bot is a NodeJS project. This means that the following must be installed in your development environment (click on them for installation instructions):

- [NodeJS](https://nodejs.dev/en/learn/how-to-install-nodejs/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

It's recommended to [learn Javascript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) before working on the project. A basicunderstanding of the language will greatly help.

# Setting up the Environment
- Clone the project
    ```
    git clone https://github.com/asiangoldfish/SortingHatBot.git
    ```

- Setup your testing bot. For a tutorial on setting it up, visit [discordjs' tutorial](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

- On Discord, go to _Settings_ -> _Advanced_. Enable _Developer Mode_. Then, create a new server. This is your test server where the bot's features and functionalities are tested. Copy the guild's ID by right clicking the server's name above all the channels. Then, select _Copy ID_ from the context menu.

- Open [.env](./.env) and make the following changes to the following variables:
    - `DISCORD_TOKEN`: Your bot's Secret Token. Never share this with anyone!
    - `CLIENT_ID`: The bot's Application ID
    - `GUILD_ID`: Your test server's ID

- You are now ready to test the bot. Execute the following commands on the console:
    ```
    npm install                 # Installs all required dependencies
    npm run deploy-dev    # Deploys all slash commands to the test server
    npm run start               # Starts the bot
    ```

- You should be able to execute Slash commands on Discord. Try this one out:
    ```
    /ping
    ```
    The bot should respond with "Pong!"

- To deploy commands to all servers, do the following:
    ```
    npm run deploy-global
    ```

Happy coding!