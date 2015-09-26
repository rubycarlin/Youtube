function playVideo(video_id)
{
	// 2. This code loads the IFrame Player API code asynchronously.
	  var tag = document.createElement('script');

	  tag.src = "https://www.youtube.com/iframe_api";
	  var firstScriptTag = document.getElementsByTagName('script')[0];
	  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	  // 3. This function creates an <iframe> (and YouTube player)
	  //    after the API code downloads.
	  var player;
	  function onYouTubeIframeAPIReady() {
	    player = new YT.Player('player', {
	      height: '390',
	      width: '640',
	    //  videoId: 'M7lc1UVf-VE',
	      videoId: video_id,
	      events: {
	        'onReady': onPlayerReady,
	        'onStateChange': onPlayerStateChange
	      }
	    });
	  }

	  // 4. The API will call this function when the video player is ready.
	  function onPlayerReady(event) {
	    event.target.playVideo();
	  }

	  // 5. The API calls this function when the player's state changes.
	  //    The function indicates that when playing a video (state=1),
	  //    the player should play for six seconds and then stop.
	  var done = false;
	  function onPlayerStateChange(event) {
	    if (event.data == YT.PlayerState.PLAYING && !done) {
	      setTimeout(stopVideo, 6000);
	      done = true;
	    }
	  }
	  function stopVideo() {
	    player.stopVideo();
	  }
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    var api_key = "AIzaSyB70uqwpz5tGshVt6vs4NaXHvFj9eqESW4";
    gapi.client.setApiKey(api_key);
    handleAPILoaded();
    search();
}


// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}