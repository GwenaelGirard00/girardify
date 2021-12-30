(function account() {

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

    /*GET USER'S PROFILE INFORMATIONS*/
    const main = document.querySelector('main.account');
    const profilePic = main.querySelector('.profile-pic img')
    const profileName = main.querySelector('.profile-name');
    const profileId = main.querySelector('.profile-id');
    const profileEMail = main.querySelector('.profile-email');
    const profileLink = main.querySelector('.profile-link a');
    const profileFollowers = main.querySelector('.profile-followers');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me", requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            profilePic.src = data.images[0].url;
            profileName.innerHTML += data.display_name;
            profileId.innerHTML += data.id;
            profileEMail.innerHTML += data.email;
            profileLink.href = data.external_urls.spotify;
            profileLink.innerText += data.external_urls.spotify;
            profileFollowers.innerHTML += data.followers.total;
        })
        .catch(function (err) {
            console.log(err);
        });



        

        /***********************
        USER - TOP
        ***********************/
        const artwork = main.querySelector('.account .artwork');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + access_token);
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=9", requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (let i = 0; i< data.items.length; i++) {
                    let img = document.createElement('div');
                    img.style.backgroundImage = "url(" + data.items[i].images[1].url + ")"

                    artwork.appendChild(img);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
}());