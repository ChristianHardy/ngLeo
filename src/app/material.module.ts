import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatInputModule, MatSnackBarModule]
})
export class MaterialModule { }
