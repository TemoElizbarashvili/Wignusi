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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AuthorsComponent } from './authors/authors.component';

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
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DropDownListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
