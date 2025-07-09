import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import{RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterOutlet],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  
  // Mock Data
  mockConversations = [
    {
      id: 1,
      property: { id: 1, name: 'فيلا فاخرة بالتجمع الخامس', price: 2500000, image: 'assets/villa1.jpg' },
      otherUser: { id: 2, name: 'أحمد محمد', photo: 'assets/user1.jpg', isOnline: true },
      lastMessage: { message: 'هل يمكن ترتيب معاينة الفيلا؟', created_at: '2025-07-01 10:30:00', seen: false },
      unreadCount: 3
    },
    {
      id: 2,
      property: { id: 2, name: 'شقة بالزمالك', price: 3200000, image: 'assets/apartment1.jpg' },
      otherUser: { id: 3, name: 'فاطمة أحمد', photo: 'assets/user2.jpg', isOnline: false },
      lastMessage: { message: 'شكراً لك، سأتواصل معك قريباً', created_at: '2025-07-01 09:15:00', seen: true },
      unreadCount: 0
    },
    {
      id: 3,
      property: { id: 3, name: 'دوبلكس بالشيخ زايد', price: 4500000, image: 'assets/duplex1.jpg' },
      otherUser: { id: 4, name: 'محمد عبدالله', photo: 'assets/user3.jpg', isOnline: true },
      lastMessage: { message: 'ما هي شروط الدفع؟', created_at: '2025-06-30 16:45:00', seen: false },
      unreadCount: 1
    }
  ];

  mockMessages = [
    { id: 1, conversation_id: 1, sender_id: 2, message: 'السلام عليكم، أنا مهتم بالفيلا', attachment_url: null, seen: true, created_at: '2025-07-01 09:00:00' },
    { id: 2, conversation_id: 1, sender_id: 1, message: 'وعليكم السلام، أهلاً بك! الفيلا متاحة للمعاينة', attachment_url: null, seen: true, created_at: '2025-07-01 09:05:00' },
    { id: 3, conversation_id: 1, sender_id: 2, message: 'رائع! ما هي المواصفات بالتفصيل؟', attachment_url: null, seen: true, created_at: '2025-07-01 09:10:00' },
    { id: 4, conversation_id: 1, sender_id: 1, message: 'الفيلا 400 متر، 4 غرف نوم، 3 حمام، حديقة واسعة', attachment_url: null, seen: true, created_at: '2025-07-01 09:15:00' },
    { id: 5, conversation_id: 1, sender_id: 2, message: 'هل يمكن ترتيب معاينة الفيلا؟', attachment_url: null, seen: false, created_at: '2025-07-01 10:30:00' }
  ];

  currentUser = { id: 1, name: 'البائع', photo: 'assets/seller.jpg' };
  
  // Component State
  selectedConversation: any = null;
  currentMessages: any[] = [];
  newMessage: string = '';
  isMobile: boolean = false;
  showConversations: boolean = true;
  isTyping: boolean = false;
  searchQuery: string = '';
  filteredConversations: any[] = [];

  ngOnInit() {
    this.checkScreenSize();
    this.filteredConversations = [...this.mockConversations];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.showConversations = true;
    }
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.id);
    
    if (this.isMobile) {
      this.showConversations = false;
    }
    
    // Mark messages as read
    conversation.unreadCount = 0;
    conversation.lastMessage.seen = true;
  }

  loadMessages(conversationId: number) {
    this.currentMessages = this.mockMessages
      .filter(msg => msg.conversation_id === conversationId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;

    const message = {
      id: Date.now(),
      conversation_id: this.selectedConversation.id,
      sender_id: this.currentUser.id,
      message: this.newMessage.trim(),
      attachment_url: null,
      seen: false,
      created_at: new Date().toISOString()
    };

    this.currentMessages.push(message);
    
    // Update last message in conversation
    this.selectedConversation.lastMessage = {
      message: message.message,
      created_at: message.created_at,
      seen: false
    };

    this.newMessage = '';
    this.scrollToBottom();
  }

 handleEnter(event: Event): void {
  const keyboardEvent = event as KeyboardEvent;

  if (keyboardEvent.ctrlKey) {
    return;
  }
  keyboardEvent.preventDefault();
  this.sendMessage();
}

  backToConversations() {
    this.showConversations = true;
    this.selectedConversation = null;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Mock file upload - في التطبيق الحقيقي سيتم رفعه للسيرفر
      const fileMessage = {
        id: Date.now(),
        conversation_id: this.selectedConversation.id,
        sender_id: this.currentUser.id,
        message: 'تم إرسال ملف: ' + file.name,
        attachment_url: URL.createObjectURL(file),
        seen: false,
        created_at: new Date().toISOString()
      };
      
      this.currentMessages.push(fileMessage);
      this.scrollToBottom();
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

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'اليوم';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'أمس';
    } else {
      return date.toLocaleDateString('ar-EG');
    }
  }

  searchConversations() {
    if (!this.searchQuery.trim()) {
      this.filteredConversations = [...this.mockConversations];
    } else {
      this.filteredConversations = this.mockConversations.filter(conv => 
        conv.otherUser.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        conv.property.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  isMessageFromCurrentUser(senderId: number): boolean {
    return senderId === this.currentUser.id;
  }

  sendQuickMessage(message: string) {
    this.newMessage = message;
    this.sendMessage();
  }}