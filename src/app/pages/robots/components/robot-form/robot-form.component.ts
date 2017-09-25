import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-form',
  templateUrl: './robot-form.component.html',
  styleUrls: ['./robot-form.component.scss']
})
export class RobotFormComponent implements OnInit {
  public superForm;
  constructor(private fb: FormBuilder) {
    this.superForm = this.fb.group({
      email: 'asdf@asdf.asfd',
      password: '123456',
      remember: false,
    });
    console.log(this.superForm);
  }

  ngOnInit() {
  }

}
