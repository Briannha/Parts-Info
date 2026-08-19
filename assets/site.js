/*
============================================================
SHARED JAVASCRIPT
============================================================

JavaScript adds behaviour to a webpage.

This starter site only uses JavaScript for one simple job:
it automatically writes the current year into the footer.

Each page includes this file with:

<script defer src="assets/site.js"></script>

The word "defer" means:
"wait until the HTML has loaded before running this script."
*/

document.addEventListener("DOMContentLoaded", () => {

  /*
  Find every HTML element that contains:
  data-year

  Example:
  <span data-year></span>
  */
  document.querySelectorAll("[data-year]").forEach((element) => {

    /*
    Replace the empty span with the current year.

    Example:
    <span data-year></span>

    becomes:

    <span data-year>2026</span>
    */
    element.textContent = new Date().getFullYear();
  });

  /*
  Keep unfinished resource links from jumping to the top of the page.
  Once a real href is added, remove data-pending-link from that link.
  */
  document.querySelectorAll("[data-pending-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const message = document.querySelector("[data-pending-message]");
      const label = link.querySelector(".mg-sign-label")?.textContent?.trim();

      if (message) {
        message.textContent = `${label || "This resource"} is ready for its link to be added.`;
      }
    });
  });

  /*
  Basic MG music player.
  The visitor selects music from their own computer, so audio files do not
  need to be uploaded or committed with the website.
  */
  const audio = document.querySelector("[data-mg-audio]");
  const filePicker = document.querySelector("[data-mg-files]");
  const previousButton = document.querySelector("[data-mg-previous]");
  const nextButton = document.querySelector("[data-mg-next]");
  const trackName = document.querySelector("[data-mg-track]");

  if (audio && filePicker && previousButton && nextButton && trackName) {
    let tracks = [];
    let currentTrack = 0;
    let activeUrl = "";

    const showTrack = (index, autoplay = false) => {
      if (!tracks.length) return;

      currentTrack = (index + tracks.length) % tracks.length;

      if (activeUrl) URL.revokeObjectURL(activeUrl);
      activeUrl = URL.createObjectURL(tracks[currentTrack]);
      audio.src = activeUrl;
      trackName.textContent = tracks[currentTrack].name.replace(/\.[^.]+$/, "");

      if (autoplay) {
        audio.play().catch(() => {});
      }
    };

    filePicker.addEventListener("change", () => {
      tracks = Array.from(filePicker.files || []);
      currentTrack = 0;
      previousButton.disabled = tracks.length < 2;
      nextButton.disabled = tracks.length < 2;

      if (tracks.length) showTrack(0, true);
    });

    previousButton.addEventListener("click", () => showTrack(currentTrack - 1, true));
    nextButton.addEventListener("click", () => showTrack(currentTrack + 1, true));
    audio.addEventListener("ended", () => showTrack(currentTrack + 1, true));

    window.addEventListener("beforeunload", () => {
      if (activeUrl) URL.revokeObjectURL(activeUrl);
    });
  }

});
