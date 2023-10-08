"use strict";
// Elements
// Navbar And Mega Menu
const megaMenuToggler = document.querySelector('.navbar .mega-show');
const megaMenu = document.querySelector('.nav-links-2');
// Prograss
const prograssContainer = document.querySelector('.own');
// First Counter Counter
const timeContainer = document.querySelector('.times');
const daysContainer = document.querySelector('.events .d'); // 15
const hoursContainer = document.querySelector('.events .h'); // 08
const minsContainer = document.querySelector('.events .m'); // 45
const secsContainer = document.querySelector('.events .s'); // 55
// Tabs
const videoImg = document.querySelector('.videos .second-half img');
const tabsContainer = document.querySelector('.videos .first-half');
const videoName = document.querySelector('.video-name');
// Second Counter
const statsContainer = document.querySelector('.stats .container');
const clientsContainer = document.querySelector('.stats .clients');
const projectsContainer = document.querySelector('.stats .projects');
const countriesContainer = document.querySelector('.stats .countries');
const moneyContainer = document.querySelector('.stats .money');

// Functions
const showMega = function () { // show Mega Menu
  megaMenu.classList.remove("hidden");
  setTimeout(() => {
    megaMenu.classList.remove("not-visible");
  }, 0);
  clickable = !clickable;
};
const hideMega = function () { // Hide MEga Menu
  megaMenu.classList.add("not-visible");
  setTimeout(() => {
    megaMenu.classList.add("hidden");
  }, 500);
  clickable = !clickable;
};
const changePrograss = function (html, css, js, py) { // To Change Prograss In Page
  const htmlString = `'${html}'`;
  const cssString = `'${css}'`;
  const jsString = `'${js}'`;
  const pyString = `'${py}'`;
  prograssContainer.style.setProperty("--html-before", htmlString);
  prograssContainer.style.setProperty("--css-before", cssString);
  prograssContainer.style.setProperty("--js-before", jsString);
  prograssContainer.style.setProperty("--python-before", pyString);
  prograssContainer.style.setProperty("--html", html);
  prograssContainer.style.setProperty("--css", css);
  prograssContainer.style.setProperty("--js", js);
  prograssContainer.style.setProperty("--python", py);
};
const counterOne = function (sec, min, hours, days) { // Counter For Days Section
  let secC = 0,
    minC = 0,
    hoursC = 0,
    daysC = 0; // C Is Counter
  let timerSec = setInterval(() => {
    ++secC;
    secsContainer.textContent = String(secC).padStart(2, "0");
    if (secC == sec) clearInterval(timerSec);
  }, 10);
  let timerMin = setInterval(() => {
    ++minC;
    minsContainer.textContent = String(minC).padStart(2, "0");
    if (minC == min) clearInterval(timerMin);
  }, 10);
  let timerHours = setInterval(() => {
    ++hoursC;
    hoursContainer.textContent = String(hoursC).padStart(2, "0");
    if (hoursC == hours) clearInterval(timerHours);
  }, 10);
  let timerDays = setInterval(() => {
    ++daysC;
    daysContainer.textContent = String(daysC).padStart(2, "0");
    if (daysC == days) clearInterval(timerDays);
  }, 10);
};
const changePhoto = function(tab, target, title) { // Change The Tabs
  videoImg.src = `imgs/videos-0${parseInt(target)+1}.jpg`; // Get The Photo
  document.querySelector('.videos .video-active').classList.remove('video-active'); // Remove Old Active Class
  tab.classList.add('video-active'); // Active The New Tab
  videoName.textContent = title; // Add Title Of The Active Tab
}
const counterTwo = function(clients, projects, countries, money) { // Counter For States
  let clientsC = 0, projectsC = 0, countriesC = 0, moneyC = 0;
  let clientsTimer = setInterval(() => {
    clientsContainer.textContent = ++clientsC;
    if(clientsC == clients) clearInterval(clientsTimer);
  }, 10);
  let projectsTimer = setInterval(() => {
    projectsContainer.textContent = ++projectsC;
    if(projectsC == projects) clearInterval(projectsTimer);
  }, 10);
  let countriesTimer = setInterval(() => {
    countriesContainer.textContent = ++countriesC;
    if(countriesC == countries) clearInterval(countriesTimer);
  }, 10);
  let moneyTimer = setInterval(() => {
    moneyContainer.textContent = ++moneyC;
    if(moneyC == money) clearInterval(moneyTimer);
  }, 10);
}
// Main
// Mega Menu
let clickable = true;
megaMenuToggler.addEventListener("click", function () {
  if (clickable) {
    clickable = !clickable;
    if (megaMenu.classList.contains("hidden")) {
      showMega();
    } else {
      hideMega();
    }
  }
});
// Change Prograss
const obs1Func = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    changePrograss("80%", "85%", "70%", "60%");
    // observer.unobserve(prograssContainer);
  }
  else {
    changePrograss('0%', '0%', '0%', '0%');
  }
};
const obs1 = new IntersectionObserver(obs1Func, {
  root: null,
  threshold: 0.5,
});
obs1.observe(prograssContainer);

// Counter Two
const obs2Func = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    counterOne(55, 45, 8, 15);
    observer.unobserve(timeContainer);
  }
};
const obs2 = new IntersectionObserver(obs2Func, {
  root: null,
  threshold: 0.5,
});
obs2.observe(timeContainer);

// Tab Sections
tabsContainer.addEventListener('click', function(e) {
  const target = e.target.closest('.video');
  if(target && !target.classList.contains('video-active')) {
    const targetVideo = target.dataset.video;
    const targetTitle = target.querySelector('p') || target.closest('p');
    changePhoto(target, targetVideo, targetTitle.innerText);
  }
});

// Second Counter
const obs3Func = function(entries, observer) {
  const [entry] = entries;
  if(entry.isIntersecting) {
    counterTwo(300, 400, 12, 500);
    observer.unobserve(statsContainer);
  }
}
const obs3 = new IntersectionObserver(obs3Func, {
  root: null,
  threshold: 0.5,
})
obs3.observe(statsContainer);