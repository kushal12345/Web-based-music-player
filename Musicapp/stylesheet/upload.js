(function () {
    "use strict";
   
    var btnUpload   = document.getElementById('btn-upload'),
        fileElement = document.getElementById('file-element'),
        
		setLocalStorage = function (item, value) {
            if (localStorage) {
                localStorage.setItem(item, value);
            } else {
                return "";
            }
        },
        getLocalStorage = function (item) {
            if (localStorage.getItem(item)) {
                return localStorage.getItem(item);
            }

            return "";
        };
  		
		btnUpload.addEventListener("click", btnupldfile, false);
		
		function btnupldfile(e) {
        if (fileElement) {
            fileElement.click();
        }

        e.stopPropagation();
        e.preventDefault();
    	}

    	fileElement.addEventListener("change", Crtplst, false);
		
		
		function Crtplst() {
        var i,
            len = this.files.length;

        Player.clearPlayList();
        
		for (i = 0; i < len; i += 1) {
        Player.setPlayList(this.files[i]);
        }

        Player.playMusic.apply(Player, [0]);
        Player.createPlayList();

    }
    
}());