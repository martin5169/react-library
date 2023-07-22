class Storage {
  constructor(key) {
    this.key = key;
  }

  getList() {
    const storedData = localStorage.getItem(this.key);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveList(lista) {
    localStorage.setItem(this.key, JSON.stringify(lista));
  }
}

export default Storage;