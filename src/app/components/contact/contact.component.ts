import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MailService} from "../../services/mail.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  errorMessage: Observable<string | null>;
  submited = false;

  constructor(private service: MailService, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.errorMessage = new Observable<string | null>();

    this.contactForm = this.fb.group({
      subject: ['', [Validators.required]],
      user: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    })
  }


  get message() {
    return this.contactForm.get("message");
  }

  get user() {
    return this.contactForm.get("user");
  }

  get subject() {
    return this.contactForm.get("subject");
  }

  onSubmit(value: any) {
    this.submited = true;
    if (this.contactForm.valid) {

        this.service.sendMail({user: value.user, subject: value.subject, message: value.message, admin: "maxime.gaber@gmail.com"}).subscribe({
          next: (value) => {
            console.log(value)
          },
          error: (err) => {
          },
          complete: () => {
          },
        });
    }
  }
}


