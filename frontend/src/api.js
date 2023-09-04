const API_ENDPOINT =
  "http://localhost:4001";
// "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

const REQUEST_ERROR = {
  '500': { message: 'request fail' }
}

const request = async url => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/cats/${url}`);
    if (response.status === 200) return response.json();
    else throw REQUEST_ERROR[response.status];
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { data: null };
  }
};

const api = {
  fetchCats: keyword => {
    return request(`search?q=${keyword}`);
  },
  fetchMoreCats: (keyword, page) => {
    return request(`search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request('random50');
  },
  fetchCatDetail: id => {
    return request(`${id}`);
  }
};
