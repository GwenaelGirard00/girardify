(function() {
    /**
    * Obtains parameters from the hash of the URL
    * @return Object
    */
    function getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    let params = getHashParams();

    let access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
    
        if (error) {
            alert('Une erreur est apparue au moment de l\'authentificaton...');
        } else {
            if (access_token) {
                document.querySelector('#login').style.display = "none";

                var myHeaders = new Headers();
                myHeaders.append(
                    'Authorization',
                    'Bearer ' + access_token
                );

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                    limit: 5,
                };


                fetch('https://api.spotify.com/v1/me/tracks?limit=50', requestOptions)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        appendData(data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                function appendData(data) {
                console.log(data);

                let mainDiv = document.getElementById("liked");

                for (var i = 0; i < data.items.length; i++) {
                        let img = document.createElement("img");
                        img.src = data.items[i].track.album.images[0].url;
                        img.style.width = "200px";
                        img.style.height = "200px";
                    
                        mainDiv.appendChild(img);
                }
            }
        } else {
            document.querySelector('#login').style.display = "flex";
        }
    }
})();