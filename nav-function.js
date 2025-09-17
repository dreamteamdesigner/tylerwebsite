function openNavi() {
    // elementsContainer.style.color = 'red'
    elementsContainer = document.querySelector('.elements').style.display = "flex";
    navOpeIcon = document.querySelector('.framer-x252hpY').style.display = "flex"
    navClosedIcon = document.querySelector('.framer-x252hp').style.display = "none"

    // document.getElementById('').style.visibility='hidden'
    // console.log(navClosed);
}
function closeNavi() {
    // elementsContainer.style.color = 'red'
    elementsContainer = document.querySelector('.elements').style.display = "none";
    navOpeIcon = document.querySelector('.framer-x252hpY').style.display = "none"
    navClosedIcon = document.querySelector('.framer-x252hp').style.display = "flex"

    // document.getElementById('').style.visibility='hidden'
    // console.log(navClosed);
}
