var tt = "tt";

const clickBtn = (stair) => {
  console.log(stair);
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

const smoothScrollTo = (containerByID) => {
  const node = document.querySelector(`#${containerByID}`);
  const navbarHeight = 0;

  window.scrollTo({
    top: node.offsetTop - navbarHeight,
    behavior: "smooth",
  });
};
