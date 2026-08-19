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

});
