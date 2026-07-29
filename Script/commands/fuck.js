module.exports.config = {
    name: "fuck",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "CBT + Fixed",
    description: "Avatar merge canvas",
    commandCategory: "nsfw",
    usages: "@mention",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const path = require("path");
    const { downloadFile } = global.utils;

    const dir = path.join(__dirname, "cache", "canvas");
    const bg = path.join(dir, "fucksv5.png");

    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(bg)) {
        await downloadFile(
            "https://i.ibb.co/VJHCjCb/images-2022-08-14-T183802-542.jpg",
            bg
        );
    }
};

async function createCircle(imagePath) {
    const Jimp = require("jimp");
    const img = await Jimp.read(imagePath);
    img.circle();
    return img;
}

async function makeImage(uid1, uid2) {
    const fs = require("fs-extra");
    const path = require("path");
    const axios = require("axios");
    const Jimp = require("jimp");

    const dir = path.join(__dirname, "cache", "canvas");

    const bg = await Jimp.read(path.join(dir, "fucksv5.png"));

    const avatar1 = path.join(dir, `avatar_${uid1}.png`);
    const avatar2 = path.join(dir, `avatar_${uid2}.png`);
    const output = path.join(dir, `result_${uid1}_${uid2}.png`);

    const img1 = await axios.get(
        `https://graph.facebook.com/${uid1}/picture?width=512&height=512`,
        { responseType: "arraybuffer" }
    );

    const img2 = await axios.get(
        `https://graph.facebook.com/${uid2}/picture?width=512&height=512`,
        { responseType: "arraybuffer" }
    );

    fs.writeFileSync(avatar1, Buffer.from(img1.data));
    fs.writeFileSync(avatar2, Buffer.from(img2.data));

    let av1 = await createCircle(avatar1);
    let av2 = await createCircle(avatar2);

    av1.resize(150, 150);
    av2.resize(150, 150);

    bg.composite(av1, 1, 1);
    bg.composite(av2, 460, 20);

    await bg.writeAsync(output);

    fs.unlinkSync(avatar1);
    fs.unlinkSync(avatar2);

    return output;
}

module.exports.run = async ({ event, api }) => {
    const fs = require("fs-extra");
    const { threadID, messageID, senderID, mentions } = event;

    const mention = Object.keys(mentions);

    if (!mention.length) {
        return api.sendMessage(
            "Please mention 1 person.",
            threadID,
            messageID
        );
    }

    try {
        const imgPath = await makeImage(senderID, mention[0]);

        api.sendMessage(
            {
                attachment: fs.createReadStream(imgPath)
            },
            threadID,
            () => {
                if (fs.existsSync(imgPath))
                    fs.unlinkSync(imgPath);
            },
            messageID
        );
    } catch (e) {
        console.log(e);
        api.sendMessage(
            "An error occurred while creating the image.",
            threadID,
            messageID
        );
    }
};
