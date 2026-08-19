BRIANNHA HARKIN - STARTER WEBSITE

Made by Briannha Harkin.

This is a very basic one-layer starter website with only:

- Ford
- Chery
- MG

FILES
-----

index.html
    The main home page.
    It contains the three clickable brand cards.

ford.html
    Blank Ford starter page.

chery.html
    Blank Chery starter page.

mg.html
    MG Catalogues And Services page.
    It contains seven pastel-pink pixel-style resource link cards,
    an animated cherry-and-moss block house background, a background-only
    viewing button and a music player.

assets/style.css
    Controls the appearance of all pages.

assets/site.js
    Contains shared JavaScript.
    Updates the footer year automatically and safely handles
    resource cards that are still waiting for their real links.
    It also runs the MG music player.

assets/mg-cherry-moss-house.gif
    Animated MG page background with drifting petals and particles.

assets/mg-cherry-moss-house.png
    Still background used when reduced-motion mode is enabled.

music/tracks/
    Put music here. Artist and album subfolders are supported.

music/Update-Playlist.cmd
    Double-click this after adding or removing music. It scans music/tracks
    recursively and updates music/playlist.json plus the offline-safe
    music/playlist.js file for the website player.


HOW THE FILES RELATE TO EACH OTHER
----------------------------------

index.html
    |
    +--> ford.html
    |
    +--> chery.html
    |
    +--> mg.html

All four HTML pages use:

assets/style.css
assets/site.js


HOW TO OPEN THE WEBSITE
-----------------------

1. Extract the ZIP file.
2. Open the extracted folder.
3. Double-click index.html.
4. The website will open in your normal web browser.

No internet connection or web server is required.


HOW TO EDIT A PAGE
------------------

You can use:

- Notepad
- Notepad++
- Visual Studio Code
- another plain-text editor

Right-click an HTML file and choose "Open with" your editor.


HOW TO ADD A LINK
-----------------

Basic link:

<a href="https://example.com">Example Website</a>

Local page:

<a href="another-page.html">Another Page</a>


HOW TO ADD ANOTHER BRAND CARD
-----------------------------

Copy one of the existing cards inside index.html.

Example:

<a class="tile ford" href="ford.html">
  <span class="kicker">Brand</span>
  <span class="name">Ford</span>
  <span class="detail">Open the Ford reference page.</span>
</a>

Then change:

- the class
- the file name
- the brand name
- the description


ABOUT THE COMMENTS IN THE CODE
------------------------------

HTML comments look like:

<!-- comment -->

CSS comments look like:

/* comment */

JavaScript comments can look like:

// comment

or:

/*
comment
*/

These comments are there to explain what each section does.
They do not appear as normal text on the finished website.


NO REAL DATA IS INCLUDED
------------------------

This template contains:

- no VIN data
- no inventory data
- no service data
- no login system
- no private information
- no external dependencies

The MG resource cards are visual placeholders until their real website
addresses or local file paths are added to mg.html.

No music files are included or tracked by Git. The MG player automatically
reads music/playlist.json when hosted, and visitors can still temporarily
select audio files from their own computer. When opened directly from the
extracted folder, the player uses music/playlist.js instead.

It is intended as a simple learning and starter template.
