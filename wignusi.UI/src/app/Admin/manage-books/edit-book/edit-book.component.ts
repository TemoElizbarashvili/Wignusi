import { Component, OnInit } from '@angular/core';
import {  FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  bookForm: FormGroup;
  authors: AuthorRm[];
  tags: TagRm[];
  bookDto: BookRm;

  constructor(private route: ActivatedRoute, private bookService: BookService, private authorService: AuthorService, private tagsService: TagsService) { }

   ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
    });

    
    // this.authorService.getAllAuthor()
    //   .subscribe(  response => {
    //     this.authors =  response
    //   });

    // this.tagsService.getAllTags()
    //   .subscribe(response => {
    //     this.tags = response
    //   });

    this.bookService.getByIdBook({ id: this.bookId })
        .subscribe(response => {
          this.bookDto = response;
          this.initForm();
        }, err => {
          console.log('wtf');
        });
     
      
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
      'authorId': new FormControl(''),
      'authors': new FormArray([]),
      'tags': new FormArray([], Validators.required)
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

