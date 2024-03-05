export const ItemCareouselEffect = () => {
  const mainImage = document.getElementById("mainImage");
  const smallImages = document.querySelectorAll(".small-image");

  smallImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
      const newImageSrc = image.getAttribute("data-image");
      mainImage.setAttribute("src", newImageSrc);
    });
  });
};
