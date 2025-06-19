async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/user");
    const result = await response.json();
  
    return result;
  } catch (error) {
    console.error("some error in fetching data...");
  }
}

export { fetchData };
