import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import Loading from "./Loading.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

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
            this.setState(data || []);
            this.loading.hide();
          });
        } else {
          api.fetchRandomCats().then(({ data }) => {
            this.setState(data || [])
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
        api.fetchCatDetail(data.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            info: data || {
              visible: false,
              info: null
            }
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
          if (data) {
            let newData = this.data.concat(data);
            this.setState(newData);
            this.page = page;
          }
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

export default App;