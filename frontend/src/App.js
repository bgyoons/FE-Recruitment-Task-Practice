class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkModeToggle = new DarkModeToggle({
      $target
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        this.loading.show();
        if (keyword) {
          api.fetchCats(keyword).then(({ data }) => {
            this.setState(data)
            this.searchResult.checkEmptyState(!!(data.length))
            this.loading.hide();
          });
        } else {
          api.getRandomCats().then(({ data }) => {
            this.setState(data)
            this.loading.hide();
          });
        }
      }
    });

    this.loading = new Loading({
      $target
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: data => {
        this.loading.show();
        api.getCatDetail(data.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            info: data
          });
          this.loading.hide();
        })
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        info: null
      }
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
