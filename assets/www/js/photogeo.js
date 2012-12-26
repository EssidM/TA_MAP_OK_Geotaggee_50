
/*  script qui dÃ©finit le control du bloc homeMenu et insÃ¨re son template EJS dans le div content */
(function () {

    var ajoutPG = can.Control({

        defaults : {
            template : 'views/ajoutPG.ejs',

        }

    }, {
        init : function(element, options) {

            element.empty();
            element.html(can.view(this.options.template))
        },

    })

    $(document).ready(function() {
        new ajoutPG('#ajoutPGdiv');
    });

})()




/**
     * Take picture with camera
     */
    function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
    };

    /**
     * Select picture from library
     */
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    
    
    function onSuccess(position) {
        //alert(position.coords.longitude );
        var element = document.getElementById('longitude');
        long=position.coords.longitude;
        lati=position.coords.latitude;
        alti=position.coords.altitude;
        
        //alert("ssss"+long);
        
        element.innerHTML = 'Longitude: '          + position.coords.longitude             + '<br />'  +'<br />';
        
        var element1=document.getElementById('latitude');
        element1.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +'<br />';
        
        
        var element2=document.getElementById('altitude');
        element2.innerHTML = 'Altitude: '           + position.coords.altitude              + '<br />' +'<br />';
        
     
        
       }



    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    
    /**
     * Upload current picture
     */
    function uploadPicture() {
        
        
        alert(long);
        alert(lati);
        alert(alti);
        
        
        // Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        //alert(imageURI);
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
        //alert(server);
        if (server) {
            
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/'));
            alert(options.fileName);
            
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
           //  var ft = new FileTransfer();ft.upload(uri, serverUrl, successCallback, errorCallback, options, true); 
            
            
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";              
            }, 
            
            
            
            
            function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;               
            }, options);
            
           var com = $("#com").val();
           var selectValuePoi= document.getElementById('main').options[document.getElementById('main').selectedIndex].value;
            
            var ajax = new XMLHttpRequest();
                ajax.open("POST", "http://10.0.2.3/wstourisme/index.php?", true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                
                var content="methode=insert&table=image&colone=nameimage,typeimage,urlimage,imagepoi,comment,nbabus,longitudeImage,latitudeImage,altitudeImage&value=" + "'" + options.fileName + "','photo g�otagg�','C:\wamp\www\photo'," + selectValuePoi + ",'" + com + "',0," + long + "," + lati + "," + alti + "";
                //alert("cnx ok");

                alert(content);
                ajax.send(content);
                alert("ajout avec succ�e");
                
                
            
        }
    }

    /**
     * View pictures uploaded to the server
     */
    function viewUploadedPictures() {
        
        // Get server URL
        server = document.getElementById('serverUrl').value;
        if (server) {
            
            // Get HTML that lists all pictures on server using XHR 
            var xmlhttp = new XMLHttpRequest();

            // Callback function when XMLHttpRequest is ready
            xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState === 4){

                    // HTML is returned, which has pictures to display
                    if (xmlhttp.status === 200) {
                        document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }

                    // If error
                    else {
                        document.getElementById('server_images').innerHTML = "Error retrieving pictures from server.";
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send();         
        }   
    }
    