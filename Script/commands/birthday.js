module.exports.config = {
  name: "birthday",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Shahadat SAHU",
  description: "মেনশন করলে শুভেচ্ছা জানাবে",
  commandCategory: "group",
  usages: "[@মেনশন]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  try {

    const allowedUID = "61584164832607";

    if (event.senderID !== allowedUID) {
      return api.sendMessage(
        "❌ এই কমান্ড শুধুমাত্র adnan ব্যবহার করতে পারবে!",
        event.threadID
      );
    }

    if (Object.keys(event.mentions).length === 0) {
      return api.sendMessage(
        "আপনি কাকে শুভেচ্ছা জানাতে চান এমন একজন কে মেনশন করুন!😘",
        event.threadID
      );
    }

    const mention = Object.keys(event.mentions)[0];
    const name = event.mentions[mention].replace("@", "");
    const arraytag = [{ id: mention, tag: name }];

    const sendMessage = (msg) => {
      api.sendMessage(
        {
          body: msg,
          mentions: arraytag
        },
        event.threadID
      );
    };

    sendMessage(`🎉🎂 adnan er পক্ষ থেকে তোমাকে জন্মদিনের শুভেচ্ছা @${name}! 🎂🎉`);

    const messages = [
      { delay: 3000, msg: `🎂 শুভ জন্মদিন @${name}!` },
      { delay: 6000, msg: `🥳 আজকের দিনটি হোক তোমার জন্য বিশেষ! @${name}` },
      { delay: 9000, msg: `🎉 অনেক অনেক শুভেচ্ছা ও ভালোবাসা @${name}` },
      { delay: 12000, msg: `🌹 সুস্থ থাকো, ভালো থাকো @${name}` },
      { delay: 15000, msg: `🎁 জীবনে আসুক অফুরন্ত সুখ @${name}` },
      { delay: 18000, msg: `💖 তোমার সব স্বপ্ন পূরণ হোক @${name}` },
      { delay: 21000, msg: `🎊 জন্মদিনের অনেক শুভেচ্ছা @${name}` },
      { delay: 24000, msg: `✨ প্রতিটি দিন কাটুক আনন্দে @${name}` },
      { delay: 27000, msg: `🌺 তোমার জীবন হোক সুন্দর ও সফল @${name}` },
      { delay: 30000, msg: `🎂 Happy Birthday @${name}` },
      { delay: 33000, msg: `🥰 তোমার জন্য রইলো অনেক দোয়া @${name}` },
      { delay: 36000, msg: `🌹 পৃথিবীর সব সুখ তোমার হোক @${name}` },
      { delay: 39000, msg: `🎁 আনন্দে ভরে উঠুক প্রতিটি মুহূর্ত @${name}` },
      { delay: 42000, msg: `💝 অনেক ভালোবাসা ও শুভকামনা @${name}` },
      { delay: 45000, msg: `🎊 Many Many Happy Returns Of The Day @${name}` },
      { delay: 48000, msg: `🌟 সামনে এগিয়ে যাও সফলতার পথে @${name}` },
      { delay: 51000, msg: `🥳 শুভ জন্মদিন প্রিয় @${name}` },
      { delay: 54000, msg: `🎂 আজকের দিনটি হোক আনন্দময় @${name}` },
      { delay: 57000, msg: `🎉 শুভ জন্মদিন, সুখে থাকো @${name}` },
      { delay: 60000, msg: `💖 জন্মদিনের শেষ শুভেচ্ছা! ভালো থেকো @${name}` }
    ];

    messages.forEach(({ delay, msg }) => {
      setTimeout(() => sendMessage(msg), delay);
    });

  } catch (error) {
    console.error(error);
    api.sendMessage(
      "বার্তা পাঠাতে সমস্যা হয়েছে!\nদয়া করে আবার চেষ্টা করুন!",
      event.threadID
    );
  }
};
