import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {  AuthorDto, AuthorRm, BookDto, TagRm } from 'src/app/api/models';
import { AuthorService, BookService, TagsService } from 'src/app/api/services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  authors: AuthorRm[];
  tags: TagRm[];
  bookDto: BookDto;

  constructor(private authorService: AuthorService, private tagsService: TagsService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.authorService.getAllAuthor()
      .subscribe(response => this.authors = response);
    this.tagsService.getAllTags()
      .subscribe(response => this.tags = response);
  }

  private initForm() { 

    this.bookForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'publisher': new FormControl(),
      'published': new FormControl(),
      'price': new FormControl(10, Validators.required),
      'isAvialable': new FormControl(true, Validators.required),
      'authorId': new FormControl('', Validators.required),
      'tag': new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    const authorId = this.bookForm.get('authorId').value;
    let author: AuthorDto;

    try {
      const response = await this.authorService.getByIdAuthor({ id: authorId }).toPromise();
      author = {
        name: response.name,
        description: response.description,
        nationality: response.nationality,
        image: response.image
      }
        
    } catch (error) {
      console.error('Error fetching author:', error);
    }

    console.log('author ID ' + this.bookForm.get('authorId').value);
    this.bookDto = {
      title: this.bookForm.get('title').value,
      description: this.bookForm.get('description').value,
      image: this.bookForm.get('image').value,
      publisher: this.bookForm.get('publisher').value,
      published: this.bookForm.get('published').value,
      price: this.bookForm.get('price').value,
      isAvialable: this.bookForm.get('isAvialable').value,
      authors: [author],
      tags: [this.bookForm.get('tag').value]
    }


    console.log('Author -' + author);
    console.log(this.bookDto);

    this.bookService.addBook({ body: this.bookDto })
      .subscribe(_ => {
        this.router.navigate(['/admin', 'books']);
      })
  }
}
