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

function openDialog() {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
}

function closeDialog() {
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);

  // Returns focus to the last active element:
  openDialogBtn.focus();
}

const openDialogBtn = document.getElementById("open-dialog-btn");
const closeDialogBtn = document.getElementById("close-dialog-btn");

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
