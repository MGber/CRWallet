import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {select, Store} from '@ngrx/store';
import {selectError} from 'src/store/selectors/user.selector';
import {AppState} from 'src/store/app.state';
import * as action from '../../../../store/actions/user.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage?: string;
  registerForm: FormGroup;
  public submited = false;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.store.dispatch(action.ClearErrors());
    this.store.pipe(select(selectError)).subscribe((errors) => {
      if(errors)
        this.errorMessage = JSON.stringify(errors).replace(/\"|}|{/g, "").replace(/,/g, "\n")
    });
    this.registerForm = fb.group({
        prenom: new FormControl('', [Validators.required]),
        nom: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        login: new FormControl('', [Validators.required, Validators.minLength(3)],),
        hash: new FormControl('', [Validators.required, this.validatePassword]),
        confirmPassword: new FormControl('', [Validators.required, this.checkPasswords]),
      },
    );
  }

  get prenom() {
    return this.registerForm.get("prenom");
  }

  get nom() {
    return this.registerForm.get("nom");
  }

  get mail() {
    return this.registerForm.get("mail");
  }

  get login() {
    return this.registerForm.get("login");
  }

  get hash() {
    return this.registerForm.get("hash");
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  ngOnInit(): void {

  }

  onSubmit(value: any): void {
    this.submited = true;
    console.log(this.confirmPassword?.errors);
    if (this.registerForm.valid) {
      this.store.dispatch(action.Register(value));
    }
  }

  validatePassword(c: FormControl) {
    let passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\\/]).{7,}$');
    return passwordRegex.test(c.value) ? null : {
      password: true
    };
  }

  checkPasswords(c: FormControl) {
    let a = c.parent;
    // @ts-ignore
    return a?.controls['hash'].value === a?.controls['confirmPassword'].value ? null : {confirm: true}
  }



}
