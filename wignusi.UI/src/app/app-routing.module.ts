import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageBooksComponent } from './Admin/manage-books/manage-books.component';
import { AdminAuthGuard } from './Services/admin-auth.guard';
import { ManageAuthorsComponent } from './Admin/manage-authors/manage-authors.component';
import { ManageUsersComponent } from './Admin/manage-users/manage-users.component';
import { AddBookComponent } from './Admin/manage-books/add-book/add-book.component';
import { AddAuthorComponent } from './Admin/manage-authors/add-author/add-author.component';
import { EditBookComponent } from './Admin/manage-books/edit-book/edit-book.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './Services/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { SummaryComponent } from './summary/summary.component';
import { BookComponent } from './book/book.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { ManageOrdersComponent } from './Admin/manage-orders/manage-orders.component';
import { UserOrdersComponent } from './cart/user-orders/user-orders.component';
import { EditAuthorComponent } from './Admin/manage-authors/edit-author/edit-author.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/:page', component: BooksComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/books', component: ManageBooksComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/books/add', component: AddBookComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/books/edit/:id', component: EditBookComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/authors', component: ManageAuthorsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/authors/edit/:id', component: EditAuthorComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/authors/add', component: AddAuthorComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/orders', component: ManageOrdersComponent, canActivate: [AuthGuard, /*AdminAuthGuard*/] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'myorders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'order-invoice', component: OrderInvoiceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
