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
    BookCardCarousel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
