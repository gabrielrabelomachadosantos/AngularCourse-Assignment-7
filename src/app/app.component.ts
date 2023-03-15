import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form!: FormGroup;
  projectStatus: string[] = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.form = new FormGroup({
      projectName: new FormControl(null, [Validators.required], this.fobiddenProjectNameValidator),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('Stable', [Validators.required])
    });
  }

  submitForm() {
    console.log(this.form.value);
  }

  fobiddenProjectNameValidator(control: AbstractControl): Promise<any> | Observable<any> {
    const forbiddenProjectName: string = 'TEST';
    
    if (forbiddenProjectName === <string>control.value.toUpperCase()) {
      return Promise.resolve({ fobiddenProjectName: true });
    }

    return Promise.resolve(null);
  }

}
