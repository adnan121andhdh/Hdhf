const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে আদনান রে হাঙ্গা করো😶👻😘",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "help": "Prefix de sala",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "SAME TO YOU😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "adnan": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Adnan Sami☜\nFacebook: https://www.facebook.com/share/1DC1CwifsA/\nWhatsApp: +9660562043993",
    "admin": "He is Adnan sami তাকে সবাই Cyber Bot Team Support Admin হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 💖",
    "dhon": "কি কাটিস নাই? কাইটা দেই?",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আদনান রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার আদনান এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami adnan": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS Murgi chor🐓💖",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "ভাই তুই এত হাসিস না..!🌚🤣",
    "miraz": "দে দে তার পুটকিতে সাবল ভইরা দে",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু",
    "kire bot": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
