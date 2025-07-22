import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  constructor(private http: HttpClient) { }

  askQuestion(question: string) {
    return this.http.post<{ answer: string }>('http://localhost:8000/api/chat', { question }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}
