import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  MinValidator,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../service/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public userDetails!: FormGroup;
  users: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.api.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }
  submitUserDetails() {
    //! "email": "john@gmail.com"
    //! "password": "m38rmF$"
    const { email, password } = this.userDetails.value;
    const userExists = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (userExists) {
      // localStorage.setItem('userDetails', JSON.stringify(userExists));
      this.auth.loginUser(userExists);
      this.userDetails.reset();
      this.dialogRef.close({ success: true });
    } else {
      this.dialogRef.close({ success: false });
    }
  }
}
