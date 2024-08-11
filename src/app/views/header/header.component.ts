import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
