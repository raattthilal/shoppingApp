import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { MatTableExporterModule } from 'mat-table-exporter';



import { AppComponent } from './app.component';
import { AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Apiinterceptor } from './apiinterceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './masters/home/home.component';
import { CartComponent } from './masters/cart/cart.component';
import { WishlistComponent } from './masters/wishlist/wishlist.component';
import { ProductComponent } from './masters/product/product.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    AngularFontAwesomeModule,
   
    // MatTableExporterModule,
   
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    
    
   
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Apiinterceptor,
    multi: true
  }
  
],
  bootstrap: [AppComponent]

})
export class AppModule { }
