# 🏠 ميزة حجز العقارات مع السعر المقترح

## 📋 نظرة عامة

تم إضافة ميزة جديدة تسمح للمستخدمين بحجز العقارات مع إمكانية تقديم سعر مقترح. هذه الميزة تعمل على كلا من Frontend (Angular) و Backend (Laravel).

## ✨ الميزات المضافة

### 🔧 Backend (Laravel)

#### 1. نموذج الحجز (Booking Model)
- **الجدول**: `bookings`
- **الحقول**:
  - `user_id` - معرف المستخدم
  - `property_id` - معرف العقار
  - `suggested_price` - السعر المقترح
  - `status` - حالة الحجز (pending, confirmed, cancelled)
  - `created_at`, `updated_at` - التواريخ

#### 2. وحدة التحكم (BookingController)
- `GET /api/bookings` - عرض جميع حجوزات المستخدم
- `POST /api/bookings` - إنشاء حجز جديد
- `GET /api/bookings/{id}` - عرض حجز محدد
- `PUT /api/bookings/{id}` - تحديث الحجز
- `DELETE /api/bookings/{id}` - حذف الحجز

#### 3. التحقق من البيانات
```php
$request->validate([
    'property_id' => 'required|exists:properties,id',
    'suggested_price' => 'required|numeric|min:0',
]);
```

### 🎨 Frontend (Angular)

#### 1. خدمة الحجوزات (BookingService)
```typescript
export interface Booking {
  id?: number;
  user_id: number;
  property_id: number;
  suggested_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  property?: any;
  user?: any;
}
```

**الوظائف المتاحة**:
- `getBookings()` - جلب جميع الحجوزات
- `createBooking(bookingData)` - إنشاء حجز جديد
- `updateBooking(id, bookingData)` - تحديث الحجز
- `deleteBooking(id)` - حذف الحجز

#### 2. مكون تفاصيل العقار (PropertyDetailsComponent)
- **زر "احجز هذا العقار"** - يفتح نموذج الحجز
- **نموذج الحجز** مع:
  - حقل السعر المقترح مع التحقق من الصحة
  - رسائل النجاح/الخطأ
  - حالة التحميل
  - تصميم متجاوب

#### 3. مكون حجوزات المستخدم (UserBookingsComponent)
- **عرض جميع الحجوزات** مع:
  - صورة العقار
  - تفاصيل الحجز
  - حالة الحجز (مؤكد، في الانتظار، ملغي)
  - إمكانية التعديل والحذف

#### 4. بطاقة العقار (PropertyCardComponent)
- **زر "احجز الآن"** - يفتح نافذة لإدخال السعر المقترح
- **تصميم محسن** مع أزرار متعددة

## 🚀 كيفية الاستخدام

### للمستخدمين:
1. **تصفح العقارات** - انتقل إلى صفحة العقارات
2. **اختر عقار** - اضغط على "احجز الآن" في بطاقة العقار
3. **أدخل السعر المقترح** - في النافذة المنبثقة
4. **تأكيد الحجز** - سيتم إرسال طلب الحجز
5. **إدارة الحجوزات** - انتقل إلى صفحة "حجوزاتي" لإدارة حجوزاتك

### للمطورين:

#### إضافة زر الحجز في أي مكون:
```typescript
import { BookingService } from '../../services/booking.service';

constructor(private bookingService: BookingService) {}

bookProperty(propertyId: number) {
  const suggestedPrice = prompt('أدخل السعر المقترح:');
  if (suggestedPrice && !isNaN(Number(suggestedPrice))) {
    this.bookingService.createBooking({
      property_id: propertyId,
      suggested_price: Number(suggestedPrice)
    }).subscribe({
      next: (response) => {
        alert('تم إرسال طلب الحجز بنجاح!');
      },
      error: (error) => {
        alert('حدث خطأ أثناء إرسال طلب الحجز');
      }
    });
  }
}
```

#### عرض الحجوزات:
```typescript
ngOnInit() {
  this.bookingService.getBookings().subscribe({
    next: (bookings) => {
      this.bookings = bookings;
    },
    error: (error) => {
      console.error('Error loading bookings:', error);
    }
  });
}
```

## 🎨 التصميم والواجهة

### الألوان المستخدمة:
- **الأزرق الأساسي**: `#1e40af`
- **الأزرق الفاتح**: `#3b82f6`
- **الأخضر النجاح**: `#10b981`
- **الأحمر الخطأ**: `#ef4444`
- **البرتقالي التحذير**: `#f59e0b`

### الحالات:
- **في الانتظار**: برتقالي
- **مؤكد**: أخضر
- **ملغي**: أحمر

### التصميم المتجاوب:
- **Desktop**: عرض شبكي مع بطاقات كبيرة
- **Tablet**: عرض شبكي مع بطاقات متوسطة
- **Mobile**: عرض عمودي مع بطاقات صغيرة

## 🔧 التثبيت والإعداد

### Backend:
1. تأكد من تشغيل Laravel على `http://127.0.0.1:8000`
2. تأكد من وجود جدول `bookings` في قاعدة البيانات
3. تأكد من تشغيل API routes

### Frontend:
1. تأكد من تشغيل Angular على `http://localhost:4200`
2. تأكد من إضافة `BookingService` في `app.module.ts`
3. تأكد من إضافة المكونات في routing

## 🧪 الاختبار

### اختبار API:
```bash
# إنشاء حجز جديد
curl -X POST http://127.0.0.1:8000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"property_id": 1, "suggested_price": 250000}'

# جلب الحجوزات
curl http://127.0.0.1:8000/api/bookings
```

### اختبار Frontend:
1. انتقل إلى صفحة العقارات
2. اضغط على "احجز الآن" في أي عقار
3. أدخل سعر مقترح
4. تحقق من إرسال الطلب
5. انتقل إلى صفحة "حجوزاتي" للتحقق من الحجز

## 🔮 التطويرات المستقبلية

- [ ] إضافة إشعارات فورية للحجوزات
- [ ] إضافة نظام تقييم للحجوزات
- [ ] إضافة إمكانية إرفاق مستندات مع الحجز
- [ ] إضافة نظام مفاوضات بين المستخدم والبائع
- [ ] إضافة تقويم لمواعيد الحجوزات
- [ ] إضافة نظام دفع للحجوزات

## 📞 الدعم

لأي استفسارات أو مشاكل، يرجى التواصل مع فريق التطوير.

---

**تم التطوير بواسطة فريق Real Estate Platform** 🏠✨ 