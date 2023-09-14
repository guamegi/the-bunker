export const smoothScrollTo = (containerByID) => {
  const node = document.querySelector(`#${containerByID}`);
  const navbarHeight = 102;

  window.scrollTo({
    top: node.offsetTop - navbarHeight,
    behavior: "smooth",
  });
};
