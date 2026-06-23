module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "CYBER BOT",
    description: "",
    commandCategory: "Admin",
    usages: "out [id]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {

    const ownerID = "61584164832607"; // এখানে তোমার UID বসাও

    if (event.senderID != ownerID) {
        return api.sendMessage(
            "আদনান ছাড়া কাউকে চু দা র টাইম নাই 😎",
            event.threadID,
            event.messageID
        );
    }

    if (!args[0]) {
        return api.removeUserFromGroup(
            api.getCurrentUserID(),
            event.threadID
        );
    }

    if (!isNaN(args[0])) {
        return api.removeUserFromGroup(
            api.getCurrentUserID(),
            args.join(" ")
        );
    }
};
