import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BookCardComponent } from './book-card/book-card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AuthorCardComponent } from './home/author-card/author-card';
import { FooterComponent } from './footer/footer.component';
import { BookCardCarousel } from './book-card-carousel/book-card-carousel.component';
import { BooksComponent } from './books/books.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AuthorsComponent } from './authors/authors.component';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageBooksComponent } from './Admin/manage-books/manage-books.component';
import { ManageAuthorsComponent } from './Admin/manage-authors/manage-authors.component';
import { AuthGuard } from './Services/auth.guard';
import { AdminAuthGuard } from './Services/admin-auth.guard';
import { ManageUsersComponent } from './Admin/manage-users/manage-users.component';
import { AddBookComponent } from './Admin/manage-books/add-book/add-book.component';
import { AddAuthorComponent } from './Admin/manage-authors/add-author/add-author.component';
import { EditBookComponent } from './Admin/manage-books/edit-book/edit-book.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CarouselComponent,
    BookCardComponent,
    TruncatePipe,
    AuthorCardComponent,
    FooterComponent,
    BookCardCarousel,
    BooksComponent,
    AuthorsComponent,
    LoginComponent,
    RegisterComponent,
    ManageBooksComponent,
    ManageAuthorsComponent,
    ManageUsersComponent,
    AddBookComponent,
    AddAuthorComponent,
    EditBookComponent,
    CartComponent,
    CheckoutComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AuthGuard,
  AdminAuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
