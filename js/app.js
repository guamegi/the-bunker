const clickPanel = (stair) => {
  switch (stair) {
    case "L":
      smoothScrollTo("section1");
      break;
    case "B1":
      smoothScrollTo("section2");
      break;
    case "B2":
      smoothScrollTo("section3");
      break;
    case "B3":
      smoothScrollTo("section4");
      break;
    default:
      smoothScrollTo("section1");
  }
};

/* utils */
const smoothScrollTo = (containerByID) => {
  const node = document.querySelector(`#${containerByID}`);

  window.scrollTo({
    top: node.offsetTop,
    behavior: "smooth",
  });
};
