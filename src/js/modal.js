const modal = (element) => {
  element.classList.add("modal--active");

  element.querySelector(".button__close").onclick = () => {
    element.classList.remove("modal--active");
  };
};
