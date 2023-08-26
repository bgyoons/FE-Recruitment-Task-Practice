class SearchResult {
  $searchResult = null;
  $ul = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    this.$ul = document.createElement("ul");
    this.$searchResult.appendChild(this.$ul);
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$ul.innerHTML = this.data
      .map(
        cat => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
