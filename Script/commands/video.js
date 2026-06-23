const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json"
    );
    return res.data.api;
  } catch (e) {
    return null;
  }
};

async function downloadFile(url, filePath) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  fs.writeFileSync(filePath, Buffer.from(res.data));
  return fs.createReadStream(filePath);
}

async function streamImage(url) {
  const res = await axios.get(url, { responseType: "stream" });
  return res.data;
}

module.exports = {
  config: {
    name: "video",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Dipto + Fixed Stable Version",
    description: "YouTube video/audio/info downloader (stable)",
    category: "media",
    usages: "{pn} -v/-a/-i <name or link>",
    cooldowns: 5
  },

  run: async ({ api, event, args }) => {
    const { threadID, messageID, senderID } = event;

    let action = (args[0] || "-v").toLowerCase();
    if (!["-v","video","mp4","-a","audio","mp3","-i","info"].includes(action)) {
      args.unshift("-v");
      action = "-v";
    }

    const isYT = /(?:youtu\.be\/|youtube\.com.*v=|shorts\/)([\w-]{11})/;

    // ---------------- LINK MODE ----------------
    if (args[1] && isYT.test(args[1])) {
      const match = args[1].match(isYT);
      const videoID = match ? match[1] : null;
      if (!videoID)
        return api.sendMessage("❌ Invalid YouTube link.", threadID, messageID);

      const format = ["-v","video","mp4"].includes(action) ? "mp4" : "mp3";

      try {
        const apiUrl = await baseApiUrl();
        if (!apiUrl)
          return api.sendMessage("❌ API server not working.", threadID, messageID);

        const { data } = await axios.get(
          `${apiUrl}/ytDl3?link=${videoID}&format=${format}&quality=3`
        );

        const filePath = path.join(__dirname, `${videoID}.${format}`);

        await api.sendMessage(
          {
            body: `🎬 ${data.title}\n⚡ Quality: ${data.quality}`,
            attachment: await downloadFile(data.downloadLink, filePath)
          },
          threadID,
          () => fs.unlinkSync(filePath),
          messageID
        );
      } catch (e) {
        return api.sendMessage("❌ Download failed.", threadID, messageID);
      }
      return;
    }

    // ---------------- SEARCH MODE ----------------
    args.shift();
    const keyword = args.join(" ");
    if (!keyword)
      return api.sendMessage("❌ Give a song/video name.", threadID, messageID);

    try {
      const apiUrl = await baseApiUrl();
      if (!apiUrl)
        return api.sendMessage("❌ API not working.", threadID, messageID);

      const { data } = await axios.get(
        `${apiUrl}/ytFullSearch?songName=${encodeURIComponent(keyword)}`
      );

      const results = data.slice(0, 5);
      if (!results.length)
        return api.sendMessage("❌ No results found.", threadID, messageID);

      let msg = "";
      const attachments = [];

      results.forEach((v, i) => {
        msg += `${i + 1}. ${v.title}\n⏱ ${v.time}\n📺 ${v.channel.name}\n\n`;
        attachments.push(streamImage(v.thumbnail));
      });

      api.sendMessage(
        {
          body: msg + "👉 Reply 1-5 to download",
          attachment: await Promise.all(attachments)
        },
        threadID,
        (err, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
            result: results,
            action
          });
        },
        messageID
      );
    } catch (e) {
      return api.sendMessage("❌ Search failed.", threadID, messageID);
    }
  },

  handleReply: async ({ api, event, handleReply }) => {
    const { threadID, messageID, senderID, body } = event;

    if (senderID !== handleReply.author) return;

    const choice = parseInt(body);
    if (!choice || choice < 1 || choice > handleReply.result.length)
      return api.sendMessage("❌ Invalid number.", threadID, messageID);

    const video = handleReply.result[choice - 1];
    const videoID = video.id;

    const action = handleReply.action;
    const format = ["-v","video","mp4"].includes(action) ? "mp4" : "mp3";

    try {
      const apiUrl = await baseApiUrl();

      const { data } = await axios.get(
        `${apiUrl}/ytDl3?link=${videoID}&format=${format}&quality=3`
      );

      const filePath = path.join(__dirname, `${videoID}.${format}`);

      await api.sendMessage(
        {
          body: `🎬 ${data.title}\n⚡ ${data.quality}`,
          attachment: await downloadFile(data.downloadLink, filePath)
        },
        threadID,
        () => fs.unlinkSync(filePath),
        messageID
      );
    } catch (e) {
      return api.sendMessage("❌ Failed to download.", threadID, messageID);
    }
  }
};
