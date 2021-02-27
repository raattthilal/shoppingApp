import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from "../../material/material.module";
import { AdminLayoutRoutes } from './admin-layout.routing';

import {MatTableModule} from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
 import { MatTableExporterModule } from 'mat-table-exporter';


import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';


import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from 'app/masters/home/home.component';
import { CartComponent } from 'app/masters/cart/cart.component';
import { ProductComponent } from 'app/masters/product/product.component';
import { WishlistComponent } from 'app/masters/wishlist/wishlist.component';

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatTableExporterModule
    
 
  ],
  declarations: [
      HomeComponent,
      CartComponent,
      WishlistComponent,
      ProductComponent,
  ],
  entryComponents:[HomeComponent]

  
 
})

export class AdminLayoutModule {}
