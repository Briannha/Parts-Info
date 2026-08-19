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

The music files must be committed and pushed with the website so GitHub Pages
can access them. After running Update-Playlist.cmd, open GitHub Desktop and
commit all of these together:

- music\tracks and every audio file inside it
- music\playlist.json
- music\playlist.js

Push the commit, then allow GitHub Pages a short time to update before testing.
Do not use Git LFS for these website audio files because GitHub Pages needs the
actual audio bytes, not LFS pointer files.

The animated MG background is also intentionally below GitHub's 50 MiB warning
point and can be committed through GitHub Desktop with the rest of the site.

If the site is opened directly by double-clicking mg.html, the browser may
block playlist.json, so the player automatically uses playlist.js instead.

Filenames and folder names are URL-encoded automatically, including spaces,
# symbols and other special characters.
