import "./style.css";
import { fetchData } from "./fetchData";
import { debounce } from "./debounce";

export async function main() {
  const tbody = document.getElementById("table-content");
  const th = document.querySelectorAll("thead th");
  const searchInput = document.getElementById("search");
  const data = await fetchData();

  // tracking sort directions
  const directions = Array(th.length).fill("");

  const debounceInput = debounce(searchData, 400);
  searchInput.addEventListener("input", debounceInput);

  data?.users?.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><img src="${item.image}" /></td>
        <td>${item.firstName}</td>
        <td>${item.lastName}</td>
        <td>${item.age}</td>
        <td>${item.email}</td>`;
    tbody.appendChild(tr);
  });

  th.forEach((ele, index) => {
    ele.addEventListener("click", (e) => {
      sortTableColumn(index);
    });
  });

  function sortTableColumn(index) {
    //check the index value of header based on current asc and des values... fill the value asc or desc
    // ["","asc","",""","""]
    const order = directions[index] || "asc"; //by default set to asc
    // check the current order and set the order value based on click
    const nextOrder = order === "asc" ? "desc" : "asc";

    //select the convert all row into array form for sort the row based on index value
    const allRow = Array.from(tbody.querySelectorAll("tr"));

    // logic to sort the row value based on columns
    allRow.sort((a, b) => {
      const aText = a.cells[index].textContent;
      const bText = b.cells[index].textContent;

      if (nextOrder === "asc") {
        return aText.localeCompare(bText);
      } else {
        return bText.localeCompare(aText);
      }
    });

    tbody.innerHTML = "";
    allRow.forEach((row) => {
      tbody.appendChild(row);
    });
    directions[index] = nextOrder;
  }

  function searchData(e) {
    let searchValue = e.target.value;
    console.log("search value ", e.target.value)
    const searchRow = Array.from(tbody.querySelectorAll("tr"));
    searchRow.forEach((row) => {
      const data = row.textContent;
      row.style.display = "revert";
      if (!data.includes(searchValue.toLowerCase())) {
        row.style.display = "none";
      }
    });
  }
}

window.onload = main;
