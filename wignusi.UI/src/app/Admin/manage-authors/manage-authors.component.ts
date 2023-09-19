import { Component, OnInit } from '@angular/core';
import { AuthorRm } from 'src/app/api/models';
import { AuthorService } from 'src/app/api/services';

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.css']
})
export class ManageAuthorsComponent implements OnInit{
  authors: AuthorRm[];


  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAllAuthor()
      .subscribe(result => this.authors = result);
  }
  
  onDeleteAuthor(id) {
    this.authorService.deleteAuthor(id);
    this.authors = this.authors.filter(a => a.id != id);
  }

}
