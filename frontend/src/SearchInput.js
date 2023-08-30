const TEMPLATE = '<input type="text">';

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

    $searchInput.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
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
