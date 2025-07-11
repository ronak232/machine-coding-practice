const products = document.querySelector(".products");
let loadmore = document.querySelector(".load");
const productUrl = "https://dummyjson.com/products";
let limit = 5;
let skip = 0;
let isFetching = false;
let hasMore = true;

function throttleScroll(func, delay) {
  let isWaiting = false; // current throttle check
  return function (...args) {
    if (isWaiting) return;

    func(...args);
    isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
    }, delay);
  };
}

loadProducts(productUrl, limit, skip); // when first time page load to fetch data
async function loadProducts(url, limit, skip) {
  if (isFetching || !hasMore) return;
  try {
    isFetching = true;
    const data = await fetch(`${url}?limit=${limit}&skip=${skip}`, {
      method: "get",
    });
    const response = await data.json();

    if (response.products.length === 0 || !response.products) {
      hasMore = false;
      return;
    }

    response.products.forEach((item) => {
      const content = document.createElement("div");
      const desc = document.createElement("p");
      const title = document.createElement("h2");
      const image = document.createElement("img");
      title.textContent = item.title;
      image.src = item.images[0];
      desc.textContent = item.description;
      content.id = item.id;
      content.className = "product";
      content.appendChild(title);
      content.appendChild(image);
      content.appendChild(desc);

      products.appendChild(content);
    });
    isFetching = false;
    console.log("skip ", skip);
  } catch (error) {
    console.error("error while fetching ", error.message);
  }
}


// traditional way by using scroll event

window.addEventListener("scroll", () => {
  // const scrollTop = window.scrollY;
  // const clientHeight = window.innerHeight;
  // const scrollHeight = document.documentElement.scrollHeight;

  // const threshold = 100; // from this part we start to fetch...

  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    skip += limit;
    scrollDelay()
  }
});

const scrollDelay = throttleScroll(() => {
  loadProducts(productUrl, limit, skip);
}, 1000);

// using intersection observer api...
// const withIntersection = (entries) => {
//   entries.forEach((item) => {
//     if (item.isIntersecting && hasMore && !isFetching) {
//       scrollDelay();
//       skip += limit;
//       // loadProducts(productUrl, limit, skip);
//     }
//   });
// };

// const options = {
//   root: null,
//   rootMargin: "10px",
//   threshold: 0.75,
// };

// const observer = new IntersectionObserver(withIntersection, options);

// observer.observe(loadmore);
