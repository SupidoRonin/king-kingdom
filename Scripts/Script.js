let intro = document.querySelector('.intro');
let introLogo = document.querySelector('.intro-logo-header');
let logoSpan = document.querySelectorAll(".intro-logo")

window.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        },2000);

        setTimeout(()=>{
            intro.style.top = "-100vh"
        }, 2300)
    })
})

function toggleDarkMode() {
  document.body.classList.toggle('light');
}

function openMenu() {
  document.getElementById('menuPopup').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  document.getElementById('content').classList.add('blurred');
}

function closeMenu() {
  document.getElementById('menuPopup').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('content').classList.remove('blurred');
}

console.log("عايز تشوف ايه هنا 🤨")