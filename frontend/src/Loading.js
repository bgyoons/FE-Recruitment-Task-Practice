class Loading {
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;

    $loading.className = "Loading";
    $target.appendChild($loading);

    this.data = {
      isLoading: false
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.isLoading) {
      this.$loading.innerHTML = `
        <div>
          <p>로딩 중</p>
        </div>
      `;
    } else {
      this.$loading.innerHTML = ``;
    }
  }
}
