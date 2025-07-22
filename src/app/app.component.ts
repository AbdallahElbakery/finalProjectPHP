import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
// import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent, HttpClientModule, CommonModule, NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'realestate-pro';
  constructor(private Router: Router) {
  }


  get showNavbar(): boolean {
    return !this.Router.url.startsWith('/admin')
  }

  get showFooter(): boolean {
    return !this.Router.url.startsWith('/admin')
  }
}

