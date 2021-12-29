(function() {

    const login = document.querySelector('#login');
    const main = document.querySelector('.main');

    const menuElements = main.querySelectorAll('.menu li')
    for (let i = 0; i < menuElements.length; i++) {
        menuElements[i].addEventListener("click", function activeLink(){
            for (let j = 0; j < menuElements.length; j++) {
                menuElements[j].classList.remove('active')
            }
            menuElements[i].classList.add('active')
        });
    }

    /*
    const menu = main.querySelector('.menu');
    const menuHeader = main.querySelector('.menu .header');
    let menuIsDisplay = false;
    menuHeader.addEventListener("click", function showMenu(){
        if (menuIsDisplay) {
            menu.classList.remove('show');
            menuIsDisplay = false;
        } else {
            menu.classList.add('show');
            menuIsDisplay = true;
        }
    });
*/


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
                login.style.display = "none";
                main.style.display = "block";

                /*Affichage des titres likés*/
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
/*
                for (var i = 0; i < data.items.length; i++) {
                        let img = document.createElement("img");
                        img.src = data.items[i].track.album.images[0].url;
                        img.style.width = "200px";
                        img.style.height = "200px";
                    
                        mainDiv.appendChild(img);
                }
*/
            }
        } else {
            login.style.display = "flex";
            main.style.display = "none";
        }
    }
})();