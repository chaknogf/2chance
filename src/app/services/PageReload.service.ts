// Importa el servicio Injectable
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageReloadService {

  reloadPage() {
    // Recarga la página actual
    window.location.reload();
  }
}
