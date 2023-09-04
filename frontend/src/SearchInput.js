import SearchHistory from "./SearchHistory.js";

class SearchInput {
  constructor({ $target, onSearch }) {
    const $section = document.createElement("section");
    $section.className = "SearchInputSection";

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    $searchInput.autofocus = true;

    const $randomButton = document.createElement("button");
    $randomButton.textContent = "랜덤고양이";
    $randomButton.className = "RandomButton";

    $section.appendChild($searchInput);
    $section.appendChild($randomButton);
    $target.appendChild($section);

    const SEARCH_HISTORY = localStorage.getItem('SEARCH_HISTORY') || '[]';
    let storageHistory = JSON.parse(SEARCH_HISTORY);

    this.searchHistory = new SearchHistory({ $target, onSearch });
    this.searchHistory.setState(storageHistory);

    $searchInput.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
        if (storageHistory.length === 5) storageHistory.shift();
        let totalHistory = storageHistory.concat(e.target.value);
        this.searchHistory.setState(totalHistory);
        localStorage.setItem('SEARCH_HISTORY', JSON.stringify(totalHistory));
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener('click', () => {
      $searchInput.value = '';
    })

    $randomButton.addEventListener("click", () => {
      onSearch('');
    });
  }
}

export default SearchInput;