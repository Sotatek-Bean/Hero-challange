import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string, canvasService: CanvasService) {
    // push new message to top of array
    this.messages.unshift(message);
    // show messages to message box
    canvasService.initMessage(this.messages);
  }

  clear() {
    this.messages = [];
  }
}
