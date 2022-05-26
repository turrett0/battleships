class StorageWrapper {
  private storage?: Storage;

  constructor(type: "local" | "session") {
    try {
      this.storage =
        type === "local" ? window.localStorage : window.sessionStorage;
    } catch (e) {
      alert(e);
    }
  }

  get length() {
    if (!this.storage) return;
    return this.storage.length;
  }

  getItem<T>(key: string) {
    if (!this.storage) return;
    try {
      const value = this.storage.getItem(key);
      if (value === null) return;

      return JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  }

  setItem(key: string, value: any) {
    if (!this.storage) return;
    try {
      if (typeof value === "string") {
        this.storage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeItem(key: string) {
    if (!this.storage) return;
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
  clear() {
    if (!this.storage) return;
    try {
      this.storage.clear();
    } catch (error) {
      console.log(error);
    }
  }
}

export const localStorageWrapper = new StorageWrapper("local");
