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

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/:page', component: BooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/books', component: ManageBooksComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/books/add', component: AddBookComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/authors', component: ManageAuthorsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
