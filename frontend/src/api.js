const API_ENDPOINT =
  "http://localhost:4001";
// "https://rhdd0roxs5.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async keyword => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      const cats = await response.json();
      return cats;
    } catch (error) {
      console.error(error)
    }
  }
};
