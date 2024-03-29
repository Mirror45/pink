const mainNav = document.querySelector(".main-nav");

mainNav.classList.add("main-nav--disabled");

const mainNav__logoToggle = mainNav.querySelector(".main-nav__logo-toggle");

mainNav__logoToggle.onclick = () => {
  let use = mainNav__logoToggle.querySelector("use");
  mainNav.classList.toggle("main-nav--disabled");
  if (mainNav.classList.contains("main-nav--disabled")) {
    use.setAttribute("href", "src/icon/img.svg#burger");
  } else {
    use.setAttribute("href", "src/icon/img.svg#close");
  }
};

const mainNav__logoLogo = mainNav.querySelector(".main-nav__logo-logo use");
const mainFooter__logo = document.querySelector(".main-footer__logo use");

window.onload = window.onresize = () => {
  if (window.innerWidth > 1200) {
    mainNav__logoLogo.setAttribute("href", "src/icon/img.svg#pink-current");
    mainFooter__logo.setAttribute("href", "src/icon/img.svg#pink-desktop");
  } else if (window.innerWidth > 660) {
    mainNav__logoLogo.setAttribute("href", "src/icon/img.svg#pink-tablet");
    mainFooter__logo.setAttribute("href", "src/icon/img.svg#pink-tablet");
  } else {
    mainNav__logoLogo.setAttribute("href", "src/icon/img.svg#pink-mobile");
  }
};
