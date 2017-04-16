// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[
  // put data here!

];
//var albums = [];
albumsList.push({
              artistName: 'the Olde Kanye',
              name: 'The College Dropout',
              releaseDate: '2004, February 10',
              genres: [ 'rap', 'hip hop' ]
            });
albumsList.push({
              artistName: 'the New Kanye',
              name: 'The Life of Pablo',
              releaseDate: '2016, Febraury 14',
              genres: [ 'hip hop' ]
            });
albumsList.push({
              artistName: 'the always rude Kanye',
              name: 'My Beautiful Dark Twisted Fantasy',
              releaseDate: '2010, November 22',
              genres: [ 'rap', 'hip hop' ]
            });
albumsList.push({
              artistName: 'the sweet Kanye',
              name: '808s & Heartbreak',
              releaseDate: '2008, November 24',
              genres: [ 'r&b', 'electropop', 'synthpop' ]
            });

var sampleSongs = [];

sampleSongs.push({ name: 'Famous',
                   trackNumber: 1
});
sampleSongs.push({ name: "All of the Lights",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Guilt Trip',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Paranoid',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Ultralight Beam',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Runaway',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Stronger',
                   trackNumber: 7
});


db.Song.remove({}, function(err, songs) {
  console.log('removed all songs');
  db.Song.create(sampleSongs, function(err, songs) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all songs');
    console.log("created", songs.length, "songs");

    db.Album.remove({}, function(err, albums){
      console.log('removed all albums');

      albumsList.forEach(function (albumData){
        var album = new db.Album({
          artistName: albumData.artistName,
          name: albumData.name,
          releaseDate: albumData.releaseDate,
          genres: albumData.genres,
          //songs: albumData.sampleSongs
        });
        db.Song.find({}, function (err, foundSongs) {
          console.log('found songs ' + foundSongs);
          if (err) {
            console.log(err);
            return;
          }
          album.songs = foundSongs;
          //console.log("db names are ", db.Song.name);
          //console.log(" db tracks are ", db.Song.trackNumber);
          album.save(function(err, savedAlbum) {
          if (err) {
            return console.log(err);
          }
          console.log('saved ' + savedAlbum);
          });
        });
        
      });
      // db.Album.create(albumsList, function(err, albums){
      //   if (err) { return console.log('ERROR', err); }
      //   console.log("all albums:", albums);
      //   console.log("created", albums.length, "albums");
      //   process.exit();
      // });

    });
  });

});


