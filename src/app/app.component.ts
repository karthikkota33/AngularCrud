import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoading = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvents) => {
      if (routerEvents instanceof NavigationStart) {
        this.showLoading = true;
      }
      if (routerEvents instanceof NavigationEnd 
        || routerEvents instanceof NavigationCancel ||
        routerEvents instanceof NavigationError) {
        this.showLoading = false;
      }
      // else {
      //   this.showLoading = false;
      // }
    })
  }
}
