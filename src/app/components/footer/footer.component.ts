import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  email: string = '';
  currentYear = new Date().getFullYear();
  showBackToTop = false;

  onSubscribe() {
    // Newsletter subscription logic
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
