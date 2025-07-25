
function generateCode(length = 12) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
}

// document.querySelector('.tile-button').addEventListener('click', () => {
//     const code = generateCode();
//     document.querySelector('.random-text').textContent = code;
// });

// document.querySelector(".overlay-background").addEventListener('click', ()=> {
//     document.querySelector(".overlay-background").style.display = 'none'
// })


document.addEventListener("DOMContentLoaded", () => {
const tileButtons = document.querySelectorAll(".tile-button");
const tile = document.querySelectorAll(".tile");
const overlay = document.querySelector(".damn");

// Loop through all tile buttons
tileButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.body.classList.add('no-scroll');
        const overlayTitle = overlay.querySelector(".overlay-title");
        const tile = button.closest(".tile");
        const title = tile.querySelector(".stander p")?.textContent || "No title";
        overlayTitle.textContent = title;   
        const code = generateCode();
        document.querySelector('.random-text').textContent = code;
        overlay.style.display = "block";
        overlay.querySelector(".overlay").focus(); // optional: focus for keyboard users
    });
});

// Optional: Close overlay on outside click or Esc key
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
    document.body.classList.remove('no-scroll');
    overlay.style.display = "none";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
    document.body.classList.remove('no-scroll');
    overlay.style.display = "none";
    }
});
});


// copy to Clipboard
function copyToClipboard() {
    const text = document.querySelector(".random-text").textContent;
    const copyButton = document.querySelector('.copy-btn');
    navigator.clipboard.writeText(text)
    .then(() => {
        copyButton.textContent = "Text copied to clipboard!";
        copyButton.classList.add('copied')

        setTimeout(() => {
            copyButton.textContent = "Copy to Clipboard";
            copyButton.classList.remove('copied')
        },2000);
    })
    .catch(err => {
        console.error("Failed to copy text: ", err);
    });
}
