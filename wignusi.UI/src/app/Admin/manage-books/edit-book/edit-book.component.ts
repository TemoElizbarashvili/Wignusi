import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormArray, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthorRm, BookDto, BookRm, TagRm } from 'src/app/api/models';
import { AuthorService, BookService, TagsService } from 'src/app/api/services';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  bookForm: FormGroup = new FormGroup({
    'title': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
    'image': new FormControl('', Validators.required),
    'publisher': new FormControl(),
    'published': new FormControl(),
    'price': new FormControl(10, Validators.required),
    'isAvialable': new FormControl(true, Validators.required),
    'authorId': new FormControl(''),
    'authors': new FormArray([]),
    'tag': new FormControl('', Validators.required)
  });
  authors: AuthorRm[] = [];
  allTags: TagRm[] = [];
  bookDto: BookDto;

  constructor(private route: ActivatedRoute, private bookService: BookService, private authorService: AuthorService,
             private tagsService: TagsService, private router: Router) { }

   ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
    });

    
    this.authorService.getAllAuthor()
      .subscribe(  response => {
        this.authors =  response
      });

    this.tagsService.getAllTags()
      .subscribe(response => {
        this.allTags = response
        console.log(response);
      });

    this.bookService.getDtoOfBook({id: this.bookId})
      .subscribe(response => {
        this.bookDto = response;
        this.initForm();
      }, err => {
        console.error(err);
      });
      
    }


  private initForm() { 
    console.log(this.bookDto);
    let title = this.bookDto.title ?? '';
    let description = this.bookDto.description ?? '';
    let image = this.bookDto.image ?? '';
    let publisher = this.bookDto.publisher ?? '';
    let published = this.bookDto.published ?? '';
    let price = this.bookDto.price ?? 10;
    let isAvialable = this.bookDto.isAvialable ?? true;
    let authorId = this.bookDto.authorsIds[0] ?? [];
    let tag = this.bookDto.tags[0] ?? '';



    this.bookForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'image': new FormControl(image, Validators.required),
      'publisher': new FormControl(publisher, Validators.required),
      'published': new FormControl(published, Validators.required),
      'price': new FormControl(price, [Validators.required, Validators.min(0) ]),
      'isAvialable': new FormControl(isAvialable, Validators.required),
      'authorId': new FormControl(authorId),
      'authors': new FormArray([]),
      'tag': new FormControl(tag, Validators.required)
    });

    console.log(this.bookForm);
  }

  onSubmit() { 
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
      authorsIds: [this.bookForm.get('authorId').value],
      tags: [this.bookForm.get('tag').value]
    }

    console.log(this.bookDto);

    this.bookService.editBook({id: this.bookId, body: this.bookDto})
      .subscribe(() => {
        console.log('book Edited!');
        this.router.navigate(['/admin', 'books']);
      });

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

