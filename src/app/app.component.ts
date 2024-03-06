import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './pages/components/messages/messages.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MessagesComponent]
})
export class AppComponent {
  title = 'World of the Fantasy';
  userService = inject(UserService);
}
