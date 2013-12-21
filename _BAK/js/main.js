var ajinkya = {} || ajinkya;
//TODO
(function(window){
    
    var renderLatestPost = function(post)
    {
        if(post && post.items && post.items.length > 0)
        {
            //console.log(post);
            $('#latestPost').removeClass('noshow').removeClass('loading');
            $('#latestPost').html(post.items[0].object.content);
        }
    }

    var loadLatestPost = function()
    {
        var req = gapi.client.plus.activities.list({userId :'112402667623874654840', collection:'public', maxResults:1});
            req.execute(function(resp) {
                renderLatestPost(resp);
            });
    }
    var renderAboutMe = function(profile)
    {
        //console.log(profile);
        if(profile && profile.aboutMe && profile.image)
        {
            $('#gplus-desc').removeClass('loading');
            $('#gplus-desc').addClass('textReady');

            $('#gplus-desc').html(profile.aboutMe); 
            $('#myPhoto').attr('src', "https://plus.google.com/s2/photos/profile/112402667623874654840?sz=120");
            //https://lh5.googleusercontent.com/-X6AI-xON1Q4/AAAAAAAAAAI/AAAAAAAAABI/Is8bS8JDvMM/photo.jpg?sz=50

            loadLatestPost();   
        }
        else
        {
            $('#gplus-desc').html('Well, I don&apos;t know what to say. But my <a href="https://twitter.com/adrijaa92">Twitter profile</a> would tell you a thing or two about me.'); 
        }

    }
    window.onGApiLoad = function()
    {
            gapi.client.setApiKey('AIzaSyAX8VRxaKSwg_Z4k0_pN9rEoKN-NODpazc');
            gapi.client.load('plus', 'v1', function(){
                var req = gapi.client.plus.people.get({userId :'112402667623874654840'});
                req.execute(function(resp){
                renderAboutMe(resp);
            });
        });
     }


     ajinkya.renderAboutMe = renderAboutMe;



})(window);