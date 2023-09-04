class App {
  $target = null;
  data = [];
  page = 1;

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
            localStorage.setItem('LAST_RESULT', JSON.stringify(data));
            this.setState(data)
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
      },
      onNextPage: () => {
        this.loading.show();
        const SEARCH_HISTORY = localStorage.getItem('SEARCH_HISTORY');
        const page = this.page + 1;
        let storageHistory = JSON.parse(SEARCH_HISTORY);
        api.fetchMoreCats(storageHistory[storageHistory.length - 1], page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
          this.page = page;
          this.loading.hide();
        });
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
