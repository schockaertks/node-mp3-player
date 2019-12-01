MP3 player for grandma

Used an old Raspberry Pi 1 Model B, USB speakers and build a wooden enclosure.
This node.js code has no external dependencies except for OMXPlayer to be installed on the Pi.
It will synchronously read all files in the songs directory into an array.
After that it will copy the array, shuffle it, pop off a song and play it via a spawned OMXPlayer.
When all songs in the copied array are played, it will copy the original array again, shuffle and start playing.
All my grandma has to do is plug in the box and the Pi will boot, the script will run automatically and the music will start playing on an infinite loop.

some quick notes if I need to reinstall:

raspbian buster lite
add ssh file to boot partition

find ip of raspberry pi (nmap)

ssh pi@ip
raspberry

update & upgrade raspbian
raspi-config
set locales

Node.js 10.x was the last official build release for armv6l
wget https://nodejs.org/dist/latest-v10.x/node-v10.17.0-linux-armv6l.tar.gz
tar -xzvf node-v10.17.0-linux-armv6l.tar.gz
cd node-v10.17.0-linux-armv6l/
sudo cp -R * /usr/local/

make songs directory in home and copy over songs
copy over mp3player.js to home

sudo nano /etc/systemd/system/mp3player.service

[Unit]
Description=My mp3player service

[Service]
WorkingDirectory=/home/pi
ExecStart=/usr/local/bin/node /home/pi/mp3player.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=mp3player

[Install]
WantedBy=multi-user.target

sudo systemctl enable mp3player
sudo systemctl start mp3player
systemctl status mp3player
