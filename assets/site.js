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
  Background-only viewing mode.
  The small fixed button stays visible so the page can always be restored.
  */
  const viewToggle = document.querySelector("[data-mg-view-toggle]");
  const viewToggleLabel = document.querySelector("[data-mg-view-toggle-label]");

  if (viewToggle && viewToggleLabel) {
    const setBackgroundOnly = (enabled) => {
      document.body.classList.toggle("mg-background-only", enabled);
      viewToggle.setAttribute("aria-pressed", String(enabled));
      viewToggleLabel.textContent = enabled ? "Show Page" : "View Background";
    };

    viewToggle.addEventListener("click", () => {
      setBackgroundOnly(!document.body.classList.contains("mg-background-only"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setBackgroundOnly(false);
    });
  }

  /*
  Basic MG music player.
  Hosted tracks are read from music/playlist.json. A local picker remains as
  a fallback, while audio files stay outside GitHub.
  */
  const audio = document.querySelector("[data-mg-audio]");
  const filePicker = document.querySelector("[data-mg-files]");
  const previousButton = document.querySelector("[data-mg-previous]");
  const nextButton = document.querySelector("[data-mg-next]");
  const reloadButton = document.querySelector("[data-mg-reload]");
  const trackName = document.querySelector("[data-mg-track]");

  if (audio && filePicker && previousButton && nextButton && reloadButton && trackName) {
    let tracks = [];
    let currentTrack = 0;
    let localUrls = [];

    const updateButtons = () => {
      previousButton.disabled = tracks.length < 2;
      nextButton.disabled = tracks.length < 2;
    };

    const clearLocalUrls = () => {
      localUrls.forEach((url) => URL.revokeObjectURL(url));
      localUrls = [];
    };

    const showTrack = (index, autoplay = false) => {
      if (!tracks.length) return;

      currentTrack = (index + tracks.length) % tracks.length;
      const track = tracks[currentTrack];
      audio.src = track.src;
      trackName.textContent = track.artist
        ? `${track.artist} — ${track.title}`
        : track.title;

      if (autoplay) {
        audio.play().catch(() => {});
      }
    };

    const useFolderPlaylist = (playlist) => {
      const musicFolderUrl = new URL("music/", document.baseURI);
      const folderTracks = Array.isArray(playlist?.tracks) ? playlist.tracks : [];

      clearLocalUrls();
      tracks = folderTracks
        .filter((track) => track && typeof track.file === "string" && track.file.trim())
        .map((track) => ({
          title: String(track.title || track.file.split("/").pop()).replace(/\.[^.]+$/, ""),
          artist: String(track.artist || ""),
          src: new URL(track.file, musicFolderUrl).href
        }));

      currentTrack = 0;
      updateButtons();

      if (tracks.length) {
        showTrack(0, false);
      } else {
        audio.removeAttribute("src");
        audio.load();
        trackName.textContent = "Music folder is empty";
      }
    };

    const loadFolderPlaylist = async () => {
      const playlistUrl = new URL("music/playlist.json", document.baseURI);
      reloadButton.disabled = true;
      trackName.textContent = "Checking music folder…";

      try {
        /* Directly opened pages cannot fetch JSON, so use playlist.js. */
        if (window.location.protocol === "file:") {
          useFolderPlaylist(window.MG_MUSIC_PLAYLIST || { tracks: [] });
          return;
        }

        const response = await fetch(playlistUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`Playlist returned ${response.status}`);

        const playlist = await response.json();
        useFolderPlaylist(playlist);
      } catch (error) {
        if (window.MG_MUSIC_PLAYLIST) {
          useFolderPlaylist(window.MG_MUSIC_PLAYLIST);
        } else {
          tracks = [];
          updateButtons();
          trackName.textContent = "Folder playlist unavailable — choose music";
        }
      } finally {
        reloadButton.disabled = false;
      }
    };

    filePicker.addEventListener("change", () => {
      clearLocalUrls();
      tracks = Array.from(filePicker.files || []).map((file) => {
        const src = URL.createObjectURL(file);
        localUrls.push(src);

        return {
          title: file.name.replace(/\.[^.]+$/, ""),
          artist: "",
          src
        };
      });
      currentTrack = 0;
      updateButtons();

      if (tracks.length) showTrack(0, true);
    });

    previousButton.addEventListener("click", () => showTrack(currentTrack - 1, true));
    nextButton.addEventListener("click", () => showTrack(currentTrack + 1, true));
    reloadButton.addEventListener("click", () => {
      if (window.location.protocol === "file:") {
        window.location.reload();
      } else {
        loadFolderPlaylist();
      }
    });
    audio.addEventListener("ended", () => showTrack(currentTrack + 1, true));
    audio.addEventListener("error", () => {
      if (!tracks.length) return;

      const reasons = {
        1: "playback was stopped",
        2: "file not found or unavailable",
        3: "audio could not be decoded",
        4: "audio format is not supported"
      };
      const reason = reasons[audio.error?.code] || "unknown playback error";
      trackName.textContent = `${tracks[currentTrack].title} — ${reason}`;
    });

    window.addEventListener("beforeunload", clearLocalUrls);
    loadFolderPlaylist();
  }

});
