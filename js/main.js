const dialog = document.querySelector("dialog");

function openDialog() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
  
  // Returns focus to the last active element:
  openDialogBtn.focus();
}

const openDialogBtn = document.getElementById("open-dialog-btn");
const closeDialogBtn = document.getElementById("close-dialog-btn");

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
