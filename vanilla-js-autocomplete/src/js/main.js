const searchProduct = document.getElementById("search");
const matchItems = document.getElementById("match-items");
const cacheRes = {};

const searchPeople = async (search) => {
  if (search.length === 0) {
    matchItems.innerHTML = "";
    return;
  }

  // check if the search term is in cache
  if (cacheRes[search]) {
    showPeopleDetails(cacheRes[search]);
    return;
  }

  try {
    console.log("api call", search);
    const res = await fetch("../../data/data.json");
    const products = await res.json();

    // Filter products based on search
    const getMatches = products.filter((product) => {
      const regex = new RegExp(`^${search}`, "gi");
      return (
        product.name.toLowerCase().match(regex) ||
        product.description.toLowerCase().match(regex)
      );
    });

    // cache the result for upcoming requests...
    cacheRes[search] = getMatches;
    showPeopleDetails(getMatches);
  } catch (error) {
    throw new Error("Error fetching data from the server...");
  }
};

const debounce = (fn, delay) => {
  let timeId;
  return (...args) => {
    if (timeId) clearTimeout(timeId);
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
                      <img src=${items.product_img} alt="${items.name}"/>
                        <p class="person-name">${items.name}</p>
                        <p class="person-detail">${items.description}</p>
                    </div>
                </div>`;
      })
      .join(" ");
    matchItems.innerHTML = html;
  }
};

const debouncedSearch = debounce(searchPeople, 400);
searchProduct.addEventListener("input", () =>
  debouncedSearch(searchProduct.value.trim())
);
