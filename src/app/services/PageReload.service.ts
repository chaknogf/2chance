import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageReloadService {
  private reloadSubject = new BehaviorSubject<boolean>(false);

  reloadPage() {
    this.reloadSubject.next(true); // Notifica el cambio sin recargar la página
  }

  get reload$() {
    return this.reloadSubject.asObservable(); // Expone el observable
  }
}
