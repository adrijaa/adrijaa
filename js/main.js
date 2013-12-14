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
        var req = gapi.client.plus.activities.list({userId :'107648012860845583983', collection:'public', maxResults:1});
                req.execute(function(resp){

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
            $('#myPhoto').attr('src', "https://plus.google.com/s2/photos/profile/107648012860845583983?sz=120");

            loadLatestPost();   
        }
        else
        {
            $('#gplus-desc').html('Well, I don&apos;t know what to say. But my <a href="https://twitter.com/adrijaa92">Twitter profile</a> would tell you a thing or two about me.'); 
        }

    }
    window.onGApiLoad = function()
    {
            gapi.client.setApiKey('AIzaSyD8n9WtQVSHqqfZcUo9Jtf4AQAshW6LgGw');
            gapi.client.load('plus', 'v1', function(){
                var req = gapi.client.plus.people.get({userId :'107648012860845583983'});
                req.execute(function(resp){
                renderAboutMe(resp);
            });
        });
     }


     ajinkya.renderAboutMe = renderAboutMe;



})(window);