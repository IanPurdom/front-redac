import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  logOut(): void {
    this.authService.user$.next(null);
    this.isAuthenticated = false;
    this.router.navigate(['/auth'])
  }
}
