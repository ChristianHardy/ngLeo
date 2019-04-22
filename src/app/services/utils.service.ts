import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, action: string = 'Cerrar', config: MatSnackBarConfig = { duration: 2000 }) {
    this.snackBar.open(message, action, config);
  }
}
