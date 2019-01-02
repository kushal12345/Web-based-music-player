
<!doctype html>

<?php
$connection = mysqli_connect("localhost","root","","music");
if(!$connection){
	echo "Could not connect to server";
	}

 if(isset($_POST['submit'])){
	$file_name = $_FILES['music']['name'];
	$tmp_name = $_FILES['music']['tmp_name'];
	move_uploaded_file($tmp_name,"Songs/".$file_name);
	$query = "INSERT INTO `list`(`ID`, `music`) VALUES ('','$file_name')";
	$result = mysqli_query($connection,$query);
	/*$duplicate = "SELECT music,
								FROM music
   							INNER JOIN (SELECT music
               	FROM   list
               	GROUP  BY music
               	HAVING COUNT(id) > 1) dup
           			ON list.music = dup.music";

	if($result){
		echo "Music sucessfully uploaded";
		}*/
}

?>

<!doctype html>

<html>
    <head>
        <meta charset="utf-8">
        <title>Music player</title>
    </head>

	<link rel="stylesheet" href="stylesheet/style.css" />

    <body>
			<div id="backgroundwhite">
    		<div id="wrapper">

                    <nav>
                       <div id="Defaultbar">
                        	<div id="Progressbar">
                            </div>

                        </div>

                        <div id="buttons">
                            <button type="button" id="Prevbutton"></button>
                            <button type="button" id="Playbutton"></button>
                            <button type="button" id="Stopbutton"></button>
                            <button type="button" id="Nextbutton"></button>
                        <div class="volume-wrap">
                            <button type="button" id="Mutebutton"></button>
                        		<span class="volume-box">
                            <input type="range" class="range" min="0" max="100" id="volume" value="100" step="1">
                        		</span>
                    	</div>

                         </div>
                        <div id="timer">
                        	<b><span id="Currenttime">0:00</span>/<span id="Fullduration">0:00</span></b> 																																					 						</div>

                    </nav>
								<div id="playlistitems">
                <marquee id="playlist_status" style="color:BLACK"></marquee>


                <form method="post" action="index.php" enctype="multipart/form-data">
                    <input type="file" name="music" id="file-element" multiple  value="" />

                    <input type="submit" id="btn-upload" name="submit" value="Upload" />
                 </form>
 </div>
     <select id="playlistlist" >
     	<option value=""></option>
     </select>
              </div>
						</div>

        <?php
				$query = "SELECT * FROM list";
				$result = mysqli_query($connection,$query);
				$sng = array();
				while($show= mysqli_fetch_assoc($result)){
						$sng[]=$show['music'];
							};
				echo '<span id="hidden">'.json_encode($sng).'</span>';
		?>
            <script src="stylesheet/javascript.js"></script>
	</body>
</html>
