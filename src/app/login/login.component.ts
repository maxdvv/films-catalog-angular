import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  credentials = {username: '', password: ''};
  errorMessage = '';
  message = '';
  isSubmitted: boolean = false

  token: any
  bindToken: any
  sessionId: any
  userId: any

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Для доступа к сайту войдите в систему'
      }
    })

    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    })

    const isLogin = this.authService.isLoggedIn();

    if (isLogin) {
      this.router.navigate(['/main']);
    }

  }

  login() {
    this.errorMessage = ''
    this.isSubmitted = true

    this.authService.getToken().subscribe(token => {
      //@ts-ignore
      this.token = token.request_token

      this.authService.bindTokenToAccount(this.credentials.username, this.credentials.password, this.token)
        .subscribe(bindToken => {
          //@ts-ignore
          this.bindToken = bindToken.request_token

          this.authService.getSession(this.bindToken).subscribe(session => {
            //@ts-ignore
            this.sessionId = session.session_id

            this.authService.getUser(this.sessionId).subscribe(user => {
              //@ts-ignore
              this.userId = user.id

              setTimeout(() => {
                this.router.navigate(['/main'])

                this.isSubmitted = false
              }, 200);

            })
          })
        }, () => {
          this.isSubmitted = false
        })
    })

  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }


}
