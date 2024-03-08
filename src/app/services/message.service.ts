import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string, canvasService: CanvasService) {
    this.messages.unshift(message);
    canvasService.initMessage(this.messages);
  }

  clear() {
    this.messages = [];
  }
}
