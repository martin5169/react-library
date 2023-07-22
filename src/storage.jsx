class Storage {
    constructor(key) {
      this.key = key;
    }
  
    getData() {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    }
  
    setData(data) {
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }
  
  export default Storage;