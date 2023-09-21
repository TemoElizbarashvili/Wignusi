import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthorRm, BookDto, TagRm } from 'src/app/api/models';
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
  bookDto: BookDto;

  constructor(private route: ActivatedRoute, private bookService: BookService, private authorService: AuthorService, private tagsService: TagsService) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
    });
    console.log(this.bookId);
    this.authorService.getAllAuthor()
      .subscribe(response => this.authors = response);
    this.tagsService.getAllTags()
      .subscribe(response => this.tags = response);
      try{
        await this.bookService.getByIdBook({ id: this.bookId })
        .subscribe(response => {
          this.bookDto = response;
          this.initForm();
        }, err => {
          console.log('wtf');
        });
      } catch (error) {
        console.log(error);
      }
      
    }


  private initForm() { 
    this.bookForm = new FormGroup({
      'title': new FormControl(this.bookDto?.title ?? '', Validators.required),
      'description': new FormControl(this.bookDto?.description ?? '', Validators.required),
      'image': new FormControl(this.bookDto?.image ?? '', Validators.required),
      'publisher': new FormControl(this.bookDto?.publisher ?? ''),
      'published': new FormControl(this.bookDto?.published ?? Date.now),
      'price': new FormControl(isNaN(this.bookDto?.price) ?? 10, Validators.required),
      'isAvialable': new FormControl(this.bookDto?.isAvialable ?? true, Validators.required),
      'authorId': new FormControl(this.bookDto?.authorsIds[0] ? null : this.bookDto.authorsIds[0], Validators.required),
      'tag': new FormControl(this.bookDto?.tags[0] ?? '', Validators.required)
    });
    // this.bookForm = new FormGroup({
    //   'title': new FormControl('', Validators.required),
    //   'description': new FormControl('', Validators.required),
    //   'image': new FormControl('', Validators.required),
    //   'publisher': new FormControl(''),
    //   'published': new FormControl(''),
    //   'price': new FormControl(10, Validators.required),
    //   'isAvialable': new FormControl(true, Validators.required),
    //   'authorId': new FormControl('', Validators.required),
    //   'tag': new FormControl('', Validators.required)
    // });
    console.log(this.bookForm);
  }

  onSubmit() { 

  }

}
