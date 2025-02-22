console.log("main js");

const searchProduct = document.getElementById("search");
const matchItems = document.getElementById("match-items");

const searchProductsItems = async (search) => {
  const res = await fetch("../../data/data.json");
  const products = await res.json();
  //get all the matched names from api
  let getMatches = products.filter((product) => {
    const regex = new RegExp(`^${search}`, "gi");
    return (
      product.name.toLowerCase().match(regex) ||
      product.description.toLowerCase().match(regex)
    );
  });

  if (search.length === 0) {
    getMatches = []; // don't show anything if nothing is typed or cleared
    matchItems.innerHTML = "";
  }

  showPeopleDetails(getMatches);
};

const showPeopleDetails = (matched) => {
  if (matched.length > 0) {
    const html = matched
      .map((items) => {
        return `<div class="card">
                    <div class="card-body">
                    <img src=${items.product_img}/>
                        <p>${items.description}</p>
                        <p>${items.name}</p>
                  </div>
                </div>`;
      })
      .join(" ");
    matchItems.innerHTML = html;
  }
};

searchProduct.addEventListener("input", () =>
  debounce(searchProductsItems(searchProduct.value), 500)
);

const debounce = (fn, delay) => {
  let timeId;
  return (...args) => {
    if (timeId) {
      clearInterval(timeId);
      timeId = setTimeout(() => {
        fn(...args);
      }, delay);
    }
  };
};
