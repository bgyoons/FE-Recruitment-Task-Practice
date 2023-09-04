class SearchHistory {
  data = [];

  constructor({ $target, onSearch }) {
    const $searchHistory = document.createElement("section");
    $searchHistory.className = "SearchHistory";

    const $ul = document.createElement("ul");
    this.$ul = $ul;

    $searchHistory.appendChild($ul);
    $target.appendChild($searchHistory);

    this.onSearch = onSearch;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length) {
      this.$ul.innerHTML = this.data.map(keyword => `
      <li class="HistoryKeyword">${keyword}</li>
      `).join("");

      this.$ul.querySelectorAll('.HistoryKeyword').forEach(($list, idx) => {
        $list.addEventListener("click", () => {
          this.onSearch(this.data[idx]);
        });
      });
    } else this.$ul.innerHTML = '';
  }
}

export default SearchHistory;