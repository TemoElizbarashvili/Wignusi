import { Component, OnInit } from '@angular/core';
import { BookRm } from 'src/app/api/models';
import { BookService } from 'src/app/api/services';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  books: BookRm[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBook()
      .subscribe(books => this.books = books); 
  }


  onDeleteBook(id: any) {
    this.bookService.deleteBook(id);
    this.books = this.books.filter(b => b.id != id);
  }
}
