import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  timeLeft: number = 5

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startTimer()
  }

  startTimer() {
    setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--
      }
    },1000)

    setTimeout(() => {
      this.router.navigate(['/main'])
    }, this.timeLeft*1000)
  }

}
