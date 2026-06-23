module.exports.config = {
  name: "bts",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Modified by ChatGPT",
  description: "Funny BTS Joke Command",
  commandCategory: "fun",
  usages: "@mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

  const uid = Object.keys(event.mentions)[0];

  if (!uid) {
    return api.sendMessage(
      "😆 | bts মাগি কে @mention দাও!",
      event.threadID
    );
  }

  const name = event.mentions[uid];

  const msgs = [
    `😂 ${name} হিজলার বাচ্চা বিটিএস এর বীর্য তর মার ভোদায় পড়ায় তর জন্ম🤣`,
    `😹 ${name} হিজলার বাচ্চা বিটিএস এর বীর্য তর মার ভোদায় পড়ায় তর জন্ম🤣`,
    `🤣 ${name} BTS Bangladesh Toilet service😂😂`,
    `😆 ${name} BTS মাগি গ ভোদায় ৪৪০ ভোল্ট এর কারেন্ট থাকে বাবা ভাই এর সাথেও সুয়ে পড়ে😂`,
    `😂 ${name} BTS মাগি তর মার যেই দিক দিয়া আসলি সেই দিক দিয়া ডুইকা যা নিরলজ্জ মাগি`,
    `😹 ${name} মা বাপরে ভাত দেওয়ার সামর্থ্য নাই মাগি করে আবার বিটিএস এর জন্য গালাগালি😂`,
    `🤣 ${name} গর্ভাবস্থায় বেশি পোন্দাইলে bts army মাগি দের জন্ম হয়🤷‍♂️`,
    `😆 ${name} জন্ম দিল তোর বাবা-মা আর তুই মগি কস বিটিএস এর জন্য সব ছাইড়া দিবি🩴`,
    `😂 ${name} বিটিএস মাগিদের সোনার উপরে dont stop লেখা থাকে👅🫦`,
    `🎉 ${name} বিডিএস মাগি আর শাহাবাগি দুইডাই এক জাত same same but different😂`
  ];

  msgs.forEach((msg, i) => {
    setTimeout(() => {
      api.sendMessage({
        body: msg,
        mentions: [{
          id: uid,
          tag: name
        }]
      }, event.threadID);
    }, i * 3000);
  });
};
