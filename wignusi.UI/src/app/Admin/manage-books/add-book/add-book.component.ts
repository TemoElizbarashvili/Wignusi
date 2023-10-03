import { Component, OnInit } from '@angular/core';
import {  FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
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
      'price': new FormControl(10, [Validators.required, Validators.min(0)]),
      'isAvialable': new FormControl(true, Validators.required),
      'authorId': new FormControl(''),
      'authors': new FormArray([]),
      'tags': new FormArray([], Validators.required)
    });
  }

  async onSubmit() {
    const authorId = this.bookForm.get('authorId').value;

    console.log('author ID ' + this.bookForm.get('authorId').value);
    this.bookDto = {
      title: this.bookForm.get('title').value,
      description: this.bookForm.get('description').value,
      image: this.bookForm.get('image').value,
      publisher: this.bookForm.get('publisher').value,
      published: this.bookForm.get('published').value,
      price: this.bookForm.get('price').value,
      isAvialable: this.bookForm.get('isAvialable').value,
      authors: this.bookForm.get('authors').value,
      authorsIds: [],
      tags: this.bookForm.get('tags').value
    }


    console.log(this.bookDto);

    this.bookService.addBook({ body: this.bookDto })
      .subscribe(_ => {
        this.router.navigate(['/admin', 'books']);
      })
  }


  onAddAuthor() {
    (<FormArray>this.bookForm.get('authors')).push(new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
      'description': new FormControl(null, Validators.required),
      'nationality': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'image': new FormControl(null, Validators.required)
    }));
  }

  onAddTag() {
    (<FormArray>this.bookForm.get('tags')).push(new FormGroup({
      'tag': new FormControl(null, Validators.required)
    }));
  }

  get controls() {
    return (<FormArray>this.bookForm.get('authors')).controls;
  }

  get tagControls() {
    return (<FormArray>this.bookForm.get('tags')).controls;
  }
}
