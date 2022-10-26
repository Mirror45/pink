if (/catalog/.test(location.pathname)) {
  const photoEditing__toggle = document.querySelectorAll(
    ".photo-editing__toggle"
  );
  const photoEditing__img = document.querySelector(".photo-editing__img");

  for (let i of photoEditing__toggle) {
    i.onmousedown = (event) => {
      i.onmousemove = (e) => {
        let left = parseInt(i.style.left);
        let output = i.querySelector("output");

        if (e.x > event.x && left < 100) {
          left += 10;
        } else if (e.x < event.x && left > 0) {
          left -= 10;
        }

        i.style.left = output.innerHTML = `${left}%`;

        if (/radius/.test(i.id)) {
          photoEditing__img.style.borderRadius = `${left / 2}%`;
        } else if (/saturate/.test(i.id)) {
          photoEditing__img.dataset.saturate = `saturate(${left}%)`;
          photoEditing__img.style.filter = photoEditing__img.dataset.contrast
            ? photoEditing__img.dataset.contrast + ` saturate(${left}%)`
            : `saturate(${left}%)`;
        } else if (/contrast/.test(i.id)) {
          photoEditing__img.dataset.contrast = `contrast(${left}%)`;
          photoEditing__img.style.filter = photoEditing__img.dataset.saturate
            ? photoEditing__img.dataset.saturate + ` contrast(${left}%)`
            : `contrast(${left}%)`;
        }
      };
    };

    window.addEventListener("mouseup", () => {
      i.onmousemove = null;
    });
  }
}
