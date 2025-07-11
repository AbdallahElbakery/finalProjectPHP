# نظام المراجعات (Reviews System)

## نظرة عامة
تم تطوير نظام مراجعات متكامل يسمح للمستخدمين بإضافة مراجعات للبائعين وعرضها في صفحات مختلفة من التطبيق.

## الميزات الرئيسية

### 1. إضافة المراجعات
- يمكن للمستخدمين إضافة مراجعات للبائعين من صفحة `user-seller-profile`
- كل مراجعة تحتوي على:
  - تقييم من 1 إلى 5 نجوم
  - تعليق نصي
  - معرف المستخدم والبائع
  - تاريخ الإنشاء

### 2. عرض المراجعات
- **صفحة المراجعات العامة** (`/reviews`): تعرض جميع المراجعات في النظام
- **صفحة مراجعات بائع محدد** (`/reviews?sellerId=X`): تعرض مراجعات بائع معين
- **صفحة البائع** (`/seller-profile`): تعرض مراجعات البائع مع زر للانتقال لصفحة المراجعات الكاملة

### 3. واجهة المستخدم
- تصميم احترافي ومتجاوب
- عرض النجوم بشكل تفاعلي
- رسائل نجاح عند إضافة مراجعة
- معالجة الأخطاء وعرض بيانات تجريبية في حالة فشل الاتصال

## البنية التقنية

### Frontend (Angular)

#### الخدمات (Services)
- **ReviewService**: يتعامل مع API المراجعات
  - `getReviews()`: جلب جميع المراجعات
  - `getReviewsBySellerId(sellerId)`: جلب مراجعات بائع محدد
  - `addReview(reviewData)`: إضافة مراجعة جديدة
  - `updateReview(reviewId, reviewData)`: تحديث مراجعة
  - `deleteReview(reviewId)`: حذف مراجعة

#### المكونات (Components)
- **UserSellerProfileComponent**: صفحة عرض البائع للمستخدمين مع إمكانية إضافة مراجعات
- **SellerProfileComponent**: صفحة البائع الشخصية مع عرض المراجعات
- **ReviewListComponent**: صفحة عرض جميع المراجعات أو مراجعات بائع محدد

### Backend (Laravel)

#### النماذج (Models)
- **Review**: نموذج المراجعات مع العلاقات
  - `user()`: علاقة مع المستخدم الذي كتب المراجعة
  - `seller()`: علاقة مع البائع الذي تم تقييمه

#### المتحكمات (Controllers)
- **ReviewController**: يتعامل مع عمليات المراجعات
  - `index()`: عرض جميع المراجعات
  - `store()`: إضافة مراجعة جديدة
  - `getReviewsBySeller($sellerId)`: جلب مراجعات بائع محدد

#### المسارات (Routes)
```php
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::get('/reviews/seller/{sellerId}', [ReviewController::class, 'getReviewsBySeller']);
```

## كيفية الاستخدام

### 1. إضافة مراجعة
1. انتقل إلى صفحة البائع (`/user-seller-profile`)
2. انقر على زر "Add review"
3. اختر التقييم من 1 إلى 5 نجوم
4. اكتب تعليقك
5. انقر على "Add"

### 2. عرض مراجعات بائع
1. انتقل إلى صفحة البائع (`/seller-profile`)
2. انقر على زر "See What Our Clients Say"
3. ستنتقل إلى صفحة المراجعات الخاصة بهذا البائع

### 3. عرض جميع المراجعات
1. انتقل إلى `/reviews`
2. ستشاهد جميع المراجعات في النظام

## قاعدة البيانات

### جدول المراجعات (reviews)
```sql
CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    seller_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
```

## البيانات التجريبية

تم إنشاء `ReviewSeeder` لإضافة بيانات تجريبية للمراجعات. لتشغيل البيانات التجريبية:

```bash
php artisan db:seed --class=ReviewSeeder
```

## الأمان والتحقق

- التحقق من صحة البيانات المدخلة
- التأكد من وجود المستخدم والبائع قبل إضافة المراجعة
- معالجة الأخطاء وعرض رسائل مناسبة
- استخدام التوكن للمصادقة

## التطوير المستقبلي

- إمكانية تعديل وحذف المراجعات
- تصفية المراجعات حسب التقييم
- إضافة صور للمراجعات
- نظام ردود البائعين على المراجعات
- إشعارات للمراجعات الجديدة 