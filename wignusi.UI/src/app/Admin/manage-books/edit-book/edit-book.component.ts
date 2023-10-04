import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormArray, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    'title': new FormControl(),
    'description': new FormControl(),
    'image': new FormControl(),
    'publisher': new FormControl(),
    'published': new FormControl(),
    'price': new FormControl(),
    'isAvialable': new FormControl(),
    'authorId': new FormControl(),
    'authors': new FormArray([]),
    'tags': new FormArray([])
  });
  authors: AuthorRm[];
  allTags: TagRm[];
  bookDto: BookDto;

  constructor(private route: ActivatedRoute, private bookService: BookService, private authorService: AuthorService, private tagsService: TagsService) { }

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
    let title = this.bookDto.title ?? '';
    let description = this.bookDto.description ?? '';
    let image = this.bookDto.image ?? '';
    let publisher = this.bookDto.publisher ?? '';
    let published = this.bookDto.published ?? '';
    let price = this.bookDto.price ?? 10;
    let isAvialable = this.bookDto.isAvialable ?? true;
    let authorId = this.bookDto.authorsIds[0] ?? [];
    let tags = this.bookDto.tags ?? [];



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
      'tags': new FormArray([], Validators.required)
    });

    tags.forEach(element => {
      let tag = element;
      (<FormArray>this.bookForm.get('tags')).push(new FormGroup({
        'tag': new FormControl(tag, Validators.required)
      }));
    });

    console.log(this.bookForm);
  }

  onSubmit() { 

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

