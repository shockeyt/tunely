// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended: true}));
// generate a new express app and call it 'app'



// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

/* hard-coded data */

var albumGenres = [];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

//GETS ALL KANYE
app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
  

});

//CREATE NEW KANYE
app.post('/api/albums', function new_album(req, res){
  // console.log(req.body);
  // db.Album.create({artistName: req.body.artistName, name: req.body.name, releaseDate: req.body.releaseDate, genres: req.body.genres}, function(err, album) {
  //   res.json(album);
  // });


  console.log(req.body.artistName);
  console.log(req.body.name);

  var newAlbum = new db.Album({
    artistName: req.body.artistName,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: req.body.genres
  });
  newAlbum.save(function (err, album){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", album);
    console.log(req.body);
    res.json(album);
  });
  albumGenres.push(req.body.genres);
});

//GET ALBUM ID

app.get('/api/albums/:id', function album_id(req, res) {
  db.Album.findOne({_id: req.params.id}, function(err, data) {
    res.json(data);
  });

});

//POST SONG
app.post('/api/albums/:id/songs', function new_song(req, res) {
  var albumId = req.params.id;
  var newSongName = req.body.name;
  var newSongTrack = req.body.trackNumber;
  //var songIndex = req.params.songs;
  console.log(albumId);
  console.log(newSongName);
  console.log(newSongTrack);
  //console.log(songIndex);

  //posts to song DB but not front end
  // var newSong = new db.Song({
  //   name: newSongName,
  //   trackNumber: newSongTrack
  // });

  // db.Album.findById(albumId, function(err, foundAlbum) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   //foundAlbum.songs.push(newSong);
  //   foundAlbum.songs.push(newSong);
  //   //console.log(foundAlbum.songs);
  //   foundAlbum.save(function(err, savedAlbum) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('saved ' + savedAlbum);
    
  //   newSong.save(function(err, song){
  //     if (err) {
  //       return console.log("save error: " + err);
  //     }
  //     console.log("saved ", song);
  //     res.json(song);
  //   });
  //   });
  // });



  //method 1
  db.Album.findById(albumId)
    //.populate('songs')
    .exec(function(err, foundAlbum) {
      //console.log(foundAlbum);
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundAlbum === null) {
        res.status(404).json({error: "no album found by id"});
      } else {
        //foundAlbum.songs.push({name: newSongName, trackNumber: newSongTrack});
        foundAlbum.songs.push(req.body);
        console.log("the body is ", req.body);
        //console.log(req.body);
        foundAlbum.save();
        console.log(foundAlbum);
        res.status(201).json(foundAlbum);
      }
    }
  );
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
