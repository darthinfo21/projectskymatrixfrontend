import { Routes } from '@angular/router';
import { SearchflightsComponent } from './components/searchflights/searchflights.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { RegisterComponent } from './components/register/register.component';
import { Flightsearch1Component } from './components/flightsearch1/flightsearch1.component';
import { SeatsComponent } from './components/seats/seats.component';
import { BookComponent } from './components/book/book.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { DeleteFlightComponent } from './components/delete-flight/delete-flight.component';
import { FlightsComponent } from './components/flights/flights.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EndComponent } from './components/end/end.component';
import { PayComponent } from './components/pay/pay.component';
import { Pay2Component } from './components/pay2/pay2.component';
import { WalletComponent } from './components/wallet/wallet.component';

export const routes: Routes = [
   {path: '', component: SearchflightsComponent},
   { path: 'userlogin', component: UserloginComponent},
   { path: 'admin', component: AdminloginComponent},
   { path: 'signup', component: RegisterComponent},
   { path: 'search', component: Flightsearch1Component},
   { path: 'seats', component: SeatsComponent},
   { path: 'book', component: BookComponent},
   { path: 'addflight', component: AddFlightComponent},
   { path: 'deleteflight', component: DeleteFlightComponent},
   { path: 'flights', component: FlightsComponent},
   { path: 'contact', component: ContactusComponent},
   { path: 'about', component: AboutusComponent},
   { path: 'confirm', component:ConfirmationComponent},
   { path: 'order', component:OrdersComponent},
   { path: 'end', component:EndComponent},
   { path: 'pay', component:PayComponent},
   { path: 'pay2', component:Pay2Component},
   { path: 'wallet', component:WalletComponent},







];
