const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $section = document.createElement("section");
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $section.appendChild($searchInput);
    $target.appendChild($section);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
  }
}
