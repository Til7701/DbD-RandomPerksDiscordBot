const {SlashCommandBuilder} = require('discord.js');
const perks = require('../perks.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-perks')
        .setDescription('Shows random perks')
        .addUserOption(option =>
            option
                .setName('first')
                .setDescription('The first Player')
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('second')
                .setDescription('The second Player')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('third')
                .setDescription('The second Player')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('fourth')
                .setDescription('The second Player')
                .setRequired(false))
        .addUserOption(option =>
            option
                .setName('fifth')
                .setDescription('The second Player')
                .setRequired(false)),
    async execute(interaction) {
        console.log('random-perks command executed');
        interaction.reply(getRandomPerks(interaction));
    },
};

function getRandomPerks(interaction) {
    const users = [];
    users.push(interaction.options.getUser('first'));
    let user = interaction.options.getUser('second');
    if (user !== null) users.push(user);
    user = interaction.options.getUser('third');
    if (user !== null) users.push(user);
    user = interaction.options.getUser('fourth');
    if (user !== null) users.push(user);
    user = interaction.options.getUser('fifth');
    if (user !== null) users.push(user);

    shuffle(users);

    const killer = users.pop();
    const survivors = users;

    let message = "<@" + killer + ">" + " as **Killer**\n";
    message += formatPerksAsString(getRandomPerksForRole("killer")) + "\n"

    for (const survivorKey in survivors) {
        message += "<@" + survivors[survivorKey] + ">" + " as **Survivor**\n";
        message += formatPerksAsString(getRandomPerksForRole("survivor")) + "\n"
    }

    return message;
}

function formatPerksAsString(userPerks) {
    let message = "";
    for (const userPerkKey in userPerks) {
        message += userPerks[userPerkKey].name + "\n";
    }
    return message;
}

function getRandomPerksForRole(role) {
    let killerPerks = [];
    killerPerks.push(getRandomPerkWithRole(role));
    while (killerPerks.length < 4) {
        let killerPerk = getRandomPerkWithRole(role);
        if (!killerPerks.includes(killerPerks))
            killerPerks.push(killerPerk);
    }
    return killerPerks;
}

function getRandomPerkWithRole(role) {
    let perk = getRandomEntry(perks.getPerks());
    while (perk.role !== role) {
        perk = getRandomEntry(perks.getPerks());
    }
    return perk;
}

function getRandomEntry(obj) {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

