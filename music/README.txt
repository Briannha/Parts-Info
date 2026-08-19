MG MUSIC FOLDER
===============

1. Put MP3, WAV, OGG, M4A, AAC or FLAC files inside:

   music\tracks

   Subfolders are supported. A useful layout is:

   music\tracks\Artist Name\Album Name\Song Name.mp3

2. Double-click:

   Update-Playlist.cmd

3. Refresh the MG page. The player reads playlist.json automatically.

The updater also creates playlist.js. This allows music to work when mg.html
is opened directly from the extracted folder instead of through a web server.

The first folder beneath tracks is used as the artist name. The song filename
is used as the track title. Tracks are sorted by their complete folder path.

The music files are ignored by Git so they remain outside the repository.
They still need to be present beside the hosted website for playback.

If the site is opened directly by double-clicking mg.html, the browser may
block playlist.json, so the player automatically uses playlist.js instead.

Filenames and folder names are URL-encoded automatically, including spaces,
# symbols and other special characters.
