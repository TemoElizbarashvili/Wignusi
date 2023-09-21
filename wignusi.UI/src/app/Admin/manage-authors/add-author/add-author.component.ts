import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorDto } from 'src/app/api/models';
import { AuthorService } from 'src/app/api/services';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  authorForm: FormGroup;


  constructor(private authorService: AuthorService, private router: Router) { }
  

  ngOnInit(): void {
    this.initForm();
  }


  initForm() { 
    this.authorForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
      'description': new FormControl('', Validators.required),
      'nationality': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      'image': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const author: AuthorDto = {
      name: this.authorForm.get('name').value,
      description: this.authorForm.get('description').value,
      nationality: this.authorForm.get('nationality').value,
      image: this.authorForm.get('image').value
    };
    this.authorService.addAuthor({ body: author })
      .subscribe(response => {
        console.log('Author added to DataBase: ' + author);
        this.router.navigate(['/admins', 'authors']);
      });
  }

}
