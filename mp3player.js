"use strict!";

const path = require("path");
const { readdirSync } = require("fs");
const { spawn } = require("child_process");

const songsLocation = "songs";
const songListOriginal = readdirSync(path.join(__dirname, songsLocation));
let songList = [];

const shuffle = arr => {
  let i = arr.length;
  while (--i) {
    let j = ~~(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const prepareSongList = () => {
  songList = [...songListOriginal];
  shuffle(songList);
};

const playSong = () => {
  if (songList.length === 0) {
    prepareSongList();
  }
  let song = path.join(__dirname, songsLocation, songList.pop());
  let omxProcess = spawn("omxplayer", [song]);
  omxProcess.on("close", playSong);
};

playSong();
