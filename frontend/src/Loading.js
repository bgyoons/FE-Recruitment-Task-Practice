class Loading {
  data = null;

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;

    $loading.className = "Loading";
    $target.appendChild($loading);

    this.data = {
      visible: false
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  show() {
    this.setState({
      visible: true
    });
  }

  hide() {
    this.setState({
      visible: false
    });
  }

  render() {
    if (this.data.visible) {
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

export default Loading;