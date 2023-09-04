class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    document.documentElement.addEventListener("keydown", e => {
      if (e.key === "Escape") this.closeModal();
    });

    $imageInfo.addEventListener("click", e => {
      if (e.target.className === "ImageInfo") this.closeModal();
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeModal() {
    this.setState({
      visible: false,
      info: null
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.info;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      const $closeButton = document.querySelector(".close");
      $closeButton.addEventListener("click", () => {
        this.closeModal()
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;