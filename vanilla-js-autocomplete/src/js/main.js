const searchProduct = document.getElementById("search");
const matchItems = document.getElementById("match-items");
const cacheRes = {};

const cacheSearchQuery = function (searchCache, data) {
  if (cacheRes[searchCache]) {
    console.log("api cache return", searchCache, data);
    return cacheRes[searchCache];
  }
  cacheRes[searchCache] = data;
  console.log("cached data", cacheRes);
};

const searchPeople = async (search) => {
  try {
    console.log("api call ", search)
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
    cacheSearchQuery(search, getMatches);
    showPeopleDetails(getMatches);
  } catch (error) {
    throw new Error("Error fetching data from the server...");
  }
};

const debounce = (fn, delay) => {
  let timeId;
  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const showPeopleDetails = (matched) => {
  if (matched.length > 0) {
    const html = matched
      .map((items) => {
        return `<div class="card">
                    <div class="card-body">
                      <img src=${items.product_img}/>
                        <p class="person-name">${items.name}</p>
                        <p class="person-detail">${items.description}</p>
                    </div>
                </div>`;
      })
      .join(" ");
    matchItems.innerHTML = html;
  }
};

// Create the debounced version of searchProductsItems outside of the event listener.
const debouncedSearch = debounce(searchPeople, 400);
searchProduct.addEventListener("input", () =>
  debouncedSearch(searchProduct.value)
);
