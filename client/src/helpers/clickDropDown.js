export const clickDropDown = (toggle_ref, content_ref) => {
  document.addEventListener("mousedown", (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
      toggle_ref.current.classList.toggle("active");
    } else {
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
        toggle_ref.current.classList.remove("active");
      }
    }
  });
};

export const closeDropDown = (toggle_ref, content_ref) => {
  content_ref.current.classList.remove("active");
  toggle_ref.current.classList.remove("active");
};
