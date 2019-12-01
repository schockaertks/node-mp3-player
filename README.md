# MP3 player for grandma

Used an old Raspberry Pi 1 Model B, USB speakers and built a wooden box to house it all.<br />
This Node.js code has no external dependencies except for OMXPlayer to be installed on the Raspberry Pi.<br />
It will synchronously read all files in the songs directory into an array.<br />
After that it will copy the array, shuffle it, pop off a song and play it via a spawned OMXPlayer.<br />
When all songs in the copied array are played, it will copy the original array again, shuffle and continue playing.<br />
All my grandma has to do is plug in the power cord and the Pi will boot, the script will run automatically and the music will start playing on an infinite loop.<br />

**some quick notes if I need to reinstall**

raspbian buster lite<br />
add ssh file to boot partition

find ip of raspberry pi (nmap)

ssh pi@ip<br />
raspberry

update & upgrade raspbian<br />
raspi-config<br />
set locales

**Node.js 10.x was the last official build release for armv6l**<br />
wget https://nodejs.org/dist/latest-v10.x/node-v10.17.0-linux-armv6l.tar.gz<br />
tar -xzvf node-v10.17.0-linux-armv6l.tar.gz<br />
cd node-v10.17.0-linux-armv6l/<br />
sudo cp -R * /usr/local/

make songs directory in home and copy over songs<br />
copy over mp3player.js to home

sudo nano /etc/systemd/system/mp3player.service

```
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
```

sudo systemctl enable mp3player<br />
sudo systemctl start mp3player<br />
systemctl status mp3player
