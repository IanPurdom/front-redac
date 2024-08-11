import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storage: Storage = sessionStorage;

  public setItem(key: string, data: any, expiresIn?: number): void {
    let test = {data, expiresIn, 'createdAt': Date.now()}
    this.storage.setItem(key, JSON.stringify(test));
  }

  public removeItem(key: string, expiresIn?: number): void {
    let res = this.storage.getItem(key);

    if (!res)
      return;
    if ((!expiresIn && (!JSON.parse(res).expiresIn || (Date.now() - JSON.parse(res).createdAt) > JSON.parse(res).expiresIn)) || (expiresIn && (Date.now() - JSON.parse(res).createdAt) > expiresIn))
      this.storage.removeItem(key);
  }

  public removeItems(expiresIn?: number): void {
    Object.keys(this.storage).forEach((key) => { 
      this.removeItem(key, expiresIn)
    });
  }

  public getItem(key: string) {
    let res = this.storage.getItem(key);

    if (!res)
      return;
    return JSON.parse(res || '').data;
  }

  public clear(): void {
    this.storage.clear();
  }
}
