import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat.service';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent implements OnInit {
  
  messages: { text: string, sender: 'user' | 'bot', timestamp: Date }[] = [];
  userInput = '';
  isLoading = false;

  constructor(private aiChatService: AiChatService) {}

  ngOnInit() {
    // Welcome message
    this.messages.push({
      text: 'Hello! I am the smart assistant for the real estate website. How can I help you?',
      sender: 'bot',
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    });

    this.isLoading = true;
    this.userInput = '';

    this.aiChatService.askQuestion(userMessage).subscribe({
      next: (response) => {
        this.messages.push({
          text: response.answer,
          sender: 'bot',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Chat error:', error);
        let errorMessage = 'Sorry, there was a connection error. Please try again.';
        
        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Make sure Laravel is running on port 8000.';
        } else if (error.status === 404) {
          errorMessage = 'Endpoint not found. Please check the API endpoint.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        this.messages.push({
          text: errorMessage,
          sender: 'bot',
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }
}
