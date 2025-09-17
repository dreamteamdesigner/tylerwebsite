const overlay = document.querySelector(".ver");
const input = document.querySelector(".pass-input");
const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector("form");
// const error = document.getElementById("error");

// submitBtn.addEventListener("click", () => {
//     const value = input.value.trim();

//     if (/^\d{10}$/.test(value)) {
//     overlay.style.display = "none";
//     } else {
//     error.style.display = "block";
//     }
// });


form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from reloading page

    const value = input.value.trim();

    if (/^\d{10}$/.test(value)) {
    overlay.style.display = "none";
    
    } else {
    submitBtn.innerHTML = "Wrong PIN"
    submitBtn.style.backgroundColor = "hsl(0, 100.00%, 50.0%, 0.10)"
    submitBtn.style.color = "hsl(0, 100.00%, 50.0%)"
    }
});
input.addEventListener("input", ()=>{
    submitBtn.innerHTML = "Proceed"
    submitBtn.style.backgroundColor = "hsl(0, 10%, 20%)"
    submitBtn.style.color = "#fff"

})
