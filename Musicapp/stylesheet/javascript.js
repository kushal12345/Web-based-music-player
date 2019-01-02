// JavaScript Document
/* jshint -W100 */ // removes the error  like This character may get silently deleted by one or more browsers.

(function () {
"use strict";

function initAudioPlayer(){

var audio,
	//btnUpload   = document.getElementById('btn-upload'),
    //fileElement = document.getElementById('file-element'),
	playlistlist = document.getElementById('playlistlist'),
  Mutebutton = document.getElementById('Mutebutton'),
	Playbutton = document.getElementById('Playbutton'),
	Stopbutton = document.getElementById('Stopbutton'),
	Nextbutton = document.getElementById('Nextbutton'),
	Prevbutton = document.getElementById('Prevbutton'),
	Fullduration = document.getElementById('Fullduration'),
	Currenttime =  document.getElementById('Currenttime'),
	volumeControl   = document.getElementById('volume'),
	updateTime, dir, playlist, playlist_index,
 	barSize = 480,
	Defaultbar = document.getElementById('Defaultbar'),
	Progressbar = document.getElementById('Progressbar'),
	song_data = document.getElementById("hidden").innerHTML,
	playlist_status = document.getElementById('playlist_status');
	song_data = JSON.parse(song_data);
	window.song_data = song_data;
	dir = "Songs/";
	playlist = song_data;
	window.playlist = playlist;
	playlist_index = 0;
	audio = new Audio();
	audio.src = dir+playlist[0];
	audio.loop = false;
//	playlistlist.innerHTML = song_data   ;

		var html='';
		for (var i=1; i<=(playlist.length-1); i++) {
    	html+= song_data[i];
		}
		playlistlist.innerHTML+= html;

			/*	var i;
	for(i=0;i<=18;i++) {

		delete playlist[i];

		}
*/



function changeDuration() {
	var minutes = parseInt(audio.duration/60),
	    seconds = parseInt(audio.duration%60);

	  if(seconds < 10){
   		seconds = '0' +  seconds;
  }

	Fullduration.innerHTML = minutes + ":" + seconds;
}

Defaultbar.addEventListener('mousemove', clickedBar,false);
audio.addEventListener("loadedmetadata", changeDuration);
Playbutton.addEventListener('click', PlayorPause,false);
Mutebutton.addEventListener('click', MuteorUnmute,false);
Stopbutton.addEventListener('click', Stop,false);
Nextbutton.addEventListener('click', Next,false);
Prevbutton.addEventListener('click', Prev,false);
volumeControl.addEventListener('mousemove', setvolume,false);
audio.addEventListener("ended", switchTrack,false);

//playlist_status.innerHTML = "Track "+(playlist_index+1)+ " - "+ playlist[playlist_index] ;

/*
 btnUpload.addEventListener("click", function (e) {
        if (fileElement) {
            fileElement.click();
        }

        e.stopPropagation();
        e.preventDefault();
    }, false);

*/
	function switchTrack(){

		if(playlist_index === (playlist.length - 1)){
			playlist_index = 0;

		} else {
		    playlist_index++;
		}

		playlist_status.innerHTML = "Track "+(playlist_index+1)+" - "+ playlist[playlist_index];
		audio.src = dir+playlist[playlist_index];
	  audio.play();
		audio.autoplay = false;
		Playbutton.style.backgroundImage = 'url(images/pauseButton.png)';
	}

 function setvolume() {
            audio.volume = volumeControl.value / 10;
        		if(audio.volume === 0) {
		Mutebutton.style.backgroundImage = 'url(images/unmuteButton.png)';
		}
		if (audio.volume !== 0) {
			Mutebutton.style.backgroundImage = 'url(images/muteButton.png)';
			}
		}

function Stop() {
	if(!audio.paused && !audio.ended) {
		audio.pause();
		audio.currentTime = 0;
		Progressbar.style.width = "0px";
		Currenttime.innerHTML = "0:00";
		Playbutton.style.backgroundImage = 'url(images/playButton.png)';
		}else {

		return false;

			}
	}


 function Next() {
 		switchTrack();
 				}

function Prev() {
		if(playlist_index === (playlist.length + 1)){

			playlist_index = 0;

		} else {

			if(playlist_index  < 1 ) {
				audio.pause();
					audio.currentTime = 0;
					Progressbar.style.width = "0px";
					Currenttime.innerHTML = "0:00";
					Playbutton.style.backgroundImage = 'url(images/pauseButton.png)';
				} else{
					playlist_index--;
					}
		}

		playlist_status.innerHTML = "Track "+(playlist_index+1)+" - "+ playlist[playlist_index];
		audio.src = dir+playlist[playlist_index];
	    audio.play();

				}


function MuteorUnmute() {

	if(audio.muted === true) {
		audio.muted = false;
		Mutebutton.style.backgroundImage = 'url(images/muteButton.png)';

		}
	else{

	audio.muted = true;
	Mutebutton.style.backgroundImage = 'url(images/unmuteButton.png)';

		}
	}

function PlayorPause() {

	if(!audio.paused && !audio.ended) {
		audio.pause();
		Playbutton.style.backgroundImage = 'url(images/playButton.png)';
		window.clearInterval(updateTime);
	}
	else{
		audio.play();
		Playbutton.style.backgroundImage = 'url(images/pauseButton.png)';
		updateTime = setInterval(update, 500);
		}
}

function update() {
	if(!audio.ended){
			var playedMinutes = parseInt(audio.currentTime / 60);
 			var playedSeconds = parseInt(audio.currentTime  % 60);

				  if(playedSeconds < 10){
   						playedSeconds = '0' +  playedSeconds;
  								}

			Currenttime.innerHTML = playedMinutes +":"+ playedSeconds;
			var size = parseInt(audio.currentTime*barSize/audio.duration);
			Progressbar.style.width = size + "px";
}else
	{
		Currenttime.innerHTML = "0:00";
		Playbutton.style.backgroundImage = 'url(images/playButton.png)';
		Progressbar.style.width = "0px";
		window.clearInterval(updateTime);
	}
}

function clickedBar(e) {
		if( !audio.ended ) {
			var mouseX =( e.pageX - Defaultbar.offsetLeft )- 310;
			var newtime = (mouseX / barSize)* audio.duration;
			audio.currentTime = newtime;
			Progressbar.style.width = mouseX + "px";

 			}
	}
}
	window.addEventListener("load", initAudioPlayer);
 })();
