import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));

      return true;
    }

    return false;
  }


  get(key: string): any {
    
    if (this.storage && key) {
      const keyfind = this.storage.getItem(key);
      try {
        return JSON.parse(keyfind ? keyfind : '');
      } catch(error) {
        console.error('Error parsing JSON', error);

        return null;

      }
    }

    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);

      return true;
    }

    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();

      return true;
    }

    return false;
  }  

}
