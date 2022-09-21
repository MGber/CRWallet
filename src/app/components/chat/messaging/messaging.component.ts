import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { select, Store } from '@ngrx/store';
import {
  selectLogin,
  selectToken,
} from '../../../../store/selectors/user.selector';
import { AppState } from '../../../../store/app.state';
import Message from '../../../models/message';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css'],
})
export class MessagingComponent implements OnInit, OnChanges {
  @Input() crypto: string;
  messages: Message[];
  message: string = '';
  messageForm = new FormGroup({
    message: new FormControl(""),
  });
  login: string;

  constructor(
    private chatService: ChatService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.chatService.obsMess.subscribe({
      next: (value) => {
        this.messages.push(JSON.parse(value));
      },
    });
    this.store.pipe(select(selectLogin)).subscribe((login) => {
      this.login = login as string;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadMessages(changes['crypto'].currentValue);
    this.crypto = changes['crypto'].currentValue;
    this.chatService.initializeWebSocketConnection(this.crypto);
  }

  formatDate(value?: string) {
    if (value) {
      return new Date(value).toLocaleString('fr-fr').substring(0, 16);
    }
    return '';
  }

  getMessageClass(login?: string) {
    console.log(login);
    console.log(this.login);
    if (login === this.login) {
      return 'messageRight';
    }
    return 'messageLeft';
  }

  getSmallClass(login?: string) {
    if (login === this.login) {
      return 'smallRight';
    }
    return 'smallLeft';
  }

  sendMessage() {
    if (this.message.trim().length > 0) {
      console.log(this.login);
      this.chatService.sendMessage(this.message, this.crypto, this.login);
      this.message = '';
    }
  }

  private loadMessages(crypto: string) {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      token = token as string;
      this.chatService.loadMessages(token, crypto).subscribe({
        next: (val) => {
          this.messages = val;
        },
        error: (err) => {},
        complete: () => {},
      });
    });
  }

  onMessagePost(value: any) {
    this.message = value.message;
    this.sendMessage();
  }
}
