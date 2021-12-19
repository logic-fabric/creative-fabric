/* -------------------------------------------------------------------------
   WARNING: native <dialog> element is not supported by Firefox, Safari & IE.
   GoogleChrome provides a polyfill to overcome it:
   https://github.com/GoogleChrome/dialog-polyfill
   ------------------------------------------------------------------------- */

const dialog = document.querySelector("dialog");

const dialogInteractiveElements = dialog.querySelectorAll(
  "a, button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])"
);
const firstInteractiveElement = dialogInteractiveElements[0];
const lastInteractiveElement =
  dialogInteractiveElements[dialogInteractiveElements.length - 1];

function trapFocus(event) {
  if (event.key === "Tab") {
    const tabForwards =
      !event.shiftKey && document.activeElement === lastInteractiveElement;
    const tabBackwards =
      event.shiftKey && document.activeElement === firstInteractiveElement;

    if (tabForwards) {
      event.preventDefault();
      firstInteractiveElement.focus();
    } else if (tabBackwards) {
      event.preventDefault();
      lastInteractiveElement.focus();
    }
  }
}

function disableEscapeClosing() {
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
    }
  });
}

function openDialog() {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
  dialog.addEventListener("keydown", disableEscapeClosing);
}

function closeDialog() {
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);
  dialog.removeEventListener("keydowm", disableEscapeClosing);

  // Returns focus to the last active element:
  openDialogBtn.focus();
}

const openDialogBtn = document.getElementById("open-dialog-btn");
const closeDialogBtn = document.getElementById("close-dialog-btn");

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
