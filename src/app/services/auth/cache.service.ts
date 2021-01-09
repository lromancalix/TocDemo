import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class CacheService {

  constructor() { }

  
  // Obtener elemento del storage.
  protected getItem<T>(key: string) {
    const data = localStorage.getItem(key);
    if(data && data !== 'undefined') {
      return JSON.parse(data);
    }
    return null;
  }

  // Agregar un elemento al storage.
  protected setItem(key: string, data: object | string) {
    if(typeof data === 'string') {
      localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Eliminar un elemento del storage
  protected removeIttem(key: string) {
    localStorage.removeItem(key);
  }

  // Limpiar el storage.
  protected clearStorage() {
    localStorage.clear();
  }

}
