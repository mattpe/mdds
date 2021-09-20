# Media Distribution and Data Streams 5

## Streaming with Icecast server

Building a basic internet radio service. (If you want, you can try using Icecast with a video stream too.)

### Setting up server side

1. On server, install [Icecast](https://icecast.org/) (`sudo apt install icecast2` in Ubuntu)
    - Choose "Yes" to create the basic configuration with setup wizard
    - Check [configuration](https://icecast.org/docs/icecast-2.4.1/config-file.html) by editing the config file `/etc/icecast2/icecast.xml` (remember to restart with `systemctl` if modified)
1. Configure your firewall to accept connections from internet to Icecast
1. To test open in browser <http://YOUR-IP-OR-HOSTNAME:8000> (or whatever port you set in config)
1. Extra: Use SSL to secure the connection using Apache (this is the last step, make sure that system works without SSL first)

### Client side streamer - Option A: BUTT

1. Download & install [butt](http://danielnoethen.de/butt/)
1. Add your Icecast server to _settings_
    - _Main_ tab -> _ADD_ -> set your server details
    - _Audio_ tab -> choose your audio input device
1. Press _play_ button to start butt to stream your mic input from your local computer to Icecast

### Client side streamer - Option B: VLC

1. As a first test, use VLC on your local computer to send a stream to Icecast.
    1. menu: _Media_ -> _Stream..._
    1. select a file, then _stream_ and in the _Destination Setup_ screen, choose _New destination: Icecast_ and click _add_
        - Address: your server ip / hostname
        - Port: 8000 (unless you changed it in config)
        - Mount point: test (or whatever you like but URL firendly: no äö, spaces, specials characters, etc...)
        - Login:pass: source:your-password (or something else if you changed the source password in config)  

### Client side streamer - Option C: Your choice

- Check possibilities to use production devices in media lab?
- Test/use any other [streaming source software](https://icecast.org/apps/) for streaming to Icecast

### Server side HTML

1. Create an html page to autoplay your radio channel (html5 audio element)
1. Note that serving mixed content, e.g. http audio stream on a html page that is served over https causes problems

## Assignment 5

1. Setup Icecast on Azure Ubuntu virtual server
1. Setup a client streamer software on your laptop/desktop computer
1. Stream audio (or video) via Icecast from local computer to other client computers
1. Test playing the stream with another computer (consumer of the stream) e.g. by using VLC as a player software
1. Create simple html page for playing your stream (Radio player)

Returning: Short report including a written description and screen shots displaying the working system. Check assignment in OMA.  

Grading: max. 4 points.

---

- More reading: Production grade streaming in Azure: [Media services](https://docs.microsoft.com/en-us/azure/media-services/)
