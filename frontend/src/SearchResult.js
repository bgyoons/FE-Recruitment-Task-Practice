class SearchResult {
  $searchResult = null;
  $ul = null;
  data = null;
  visible = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    this.$ul = document.createElement("ul");
    this.$searchResult.appendChild(this.$ul);
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    const LAST_RESULT = localStorage.getItem('LAST_RESULT');
    if (LAST_RESULT) {
      let lastResult = JSON.parse(LAST_RESULT);
      this.setState(lastResult);
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.visible = !!(nextData.length);
    this.render();
  }

  IO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('img').src = entry.target.querySelector('img').dataset.src;
        if (this.data.length - 1 === +entry.target.dataset.index) this.onNextPage();
      }
    });
  })

  render() {
    if (this.visible) {
      this.$ul.innerHTML = this.data
        .map((cat, index) => `
        <li class="item" data-index=${index}>
          <img class="item-img" src="https://pbs.twimg.com/media/CYEoaOwUkAAxIUR.jpg" data-src=${cat.url} alt=${cat.name} />
        </li>
        `).join("");


      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        this.IO.observe($item);

        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    } else if (!this.visible && typeof this.visible === 'boolean') {
      this.$ul.innerHTML = '<li class="EmptyState">검색 결과가 없습니다.</li>';
    } else { }
  }
}

export default SearchResult;