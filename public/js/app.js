/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
            id: 1,
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
            id: 2,
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
            id: 3,
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
            id: 4,
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */






  //gets sample albums
  // sampleAlbums.forEach(function(index) {
  //   renderAlbum(index);
  // });
  //renderAlbum(sampleAlbums[0]);
$(document).ready(function() {
  console.log('app.js loaded!');
  
  //gets db albums
  $.get('/api/albums', function(res) {
    res.forEach(function(index) {
      console.log("album from DB is ", index);
      renderAlbum(index);
    });
  


  });

    $('#albums').on('click', '.add-song', function(e) {
        e.preventDefault();
        //console.log('asdfasdfasdf');
        var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
        //console.log('id',id);
        $('#songModal').data('album-id', id);
        $('#songModal').modal();
    });



    $('form').on('submit', function(e) {
      e.preventDefault();
      //alert('submit clicked');
      var formData = $(this).serialize();
      //console.log(formData);

      $.ajax({
        url: '/api/albums',
        type: 'POST',
        data: formData,
        success: console.log("success")
      });

      $(this).trigger("reset");
      //$('.form-control').trigger("reset");
    });


    $('#saveSong').on('click', function handleNewSongSubmit(e) {
      e.preventDefault();
      var newSong = $('#songName').val();
      var newTrack =  $('#trackNumber').val();
      console.log(newSong);
      console.log(newTrack);
      var albumUrl = $('#songModal').data('album-id');
      var entry = {
        name: newSong,
        trackNumber: newTrack
      };
      console.log(albumUrl);
      //console.log('new song serialized', $(this).serialize());

      $.ajax({
        url: '/api/albums/' + albumUrl + '/songs',
        type: 'POST',
        data: entry,
        success: console.log("success " + newSong + newTrack)
      });
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('toggle');
    });


});



function buildSongsHtml(songs) {

  var songText = " – "; 
  //console.log(songs);
  songs.forEach(function(song) { 
      songText = songText + "(" + song.trackNumber + ") " + song.name + " – ";
      //console.log(song); 
  }); 
   
  var songsHtml = songText;
  return songsHtml;

}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  //console.log('rendering album:', album);
  var songList = buildSongsHtml(album.songs);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Songs:</h4>" +
  "                        <span class='album-songs'>" + songList + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "               <div class='panel-footer'>" +
  "               <button class='btn btn-primary add-song'>Add Song</button>" +
  "               </div>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";



  // render to the page with jQuery
  $('#albums').append(albumHtml);
  //buildSongsHtml();

}



//$.get('')


