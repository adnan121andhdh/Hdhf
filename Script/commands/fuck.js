module.exports.config = {
    name: "fuck",
    version: "3.1.1",
    hasPermssion: 0,
    credits: "C B T (fixed)",
    description: "Avatar merge canvas",
    commandCategory: "nsfw",
    usages: "[@mention]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;

    const dir = resolve(__dirname, "cache", "canvas");
    const filePath = resolve(dir, "fucksv5.png");

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    if (!existsSync(filePath)) {
        await downloadFile(
            "https://i.ibb.co/VJHCjCb/images-2022-08-14-T183802-542.jpg",
            filePath
        );
    }
};

async function circle(imagePath) {
    const jimp = require("jimp");
    let img = await jimp.read(imagePath);
    img.circle();
    return img;
}

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];

    const cacheDir = path.resolve(__dirname, "cache", "canvas");

    let base = await jimp.read(cacheDir + "/fucksv5.png");

    let avatarOnePath = cacheDir + `/avt_${one}.png`;
    let avatarTwoPath = cacheDir + `/avt_${two}.png`;
    let outputPath = cacheDir + `/result_${one}_${two}.png`;

    // get avatars
    let img1 = await axios.get(
        `https://graph.facebook.com/${one}/picture?width=512&height=512`,
        { responseType: "arraybuffer" }
    );

    let img2 = await axios.get(
        `https://graph.facebook.com/${two}/picture?width=512&height=512`,
        { responseType: "arraybuffer" }
    );

    fs.writeFileSync(avatarOnePath, Buffer.from(img1.data));
    fs.writeFileSync(avatarTwoPath, Buffer.from(img2.data));

    let circleOne = await circle(avatarOnePath);
    let circleTwo = await circle(avatarTwoPath);

    circleOne = circleOne.resize(150, 150);
    circleTwo = circleTwo.resize(150, 150);

    base.composite(circleOne, 1, 1);
    base.composite(circleTwo, 460, 20);

    let buffer = await base.getBufferAsync("image/png");
    fs.writeFileSync(outputPath, buffer);

    fs.unlinkSync(avatarOnePath);
    fs.unlinkSync(avatarTwoPath);

    return outputPath;
}

module.exports.run = async function ({ event, api }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID, mentions } = event;

    let tagged = Object.keys(mentions);

    if (!tagged[0]) {
        return api.sendMessage("Please mention 1 person.", threadID, messageID);
    }

    let one = senderID;
    let two = tagged[0];

    let path = await makeImage({ one, two });

    return api.sendMessage(
        { attachment: fs.createReadStream(path) },
        threadID,
        () => fs.unlinkSync(path),
        messageID
    );
};
