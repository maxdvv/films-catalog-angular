import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/main']);
    }

  }

  submitForm() {}


  goToLogin() {
    this.router.navigate(['/login']);
  }

}
