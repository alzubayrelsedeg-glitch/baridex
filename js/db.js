// ====================================
// قاعدة البيانات المحلية - Baridex
// ====================================

class BaridexDB {
    constructor() {
        this.init();
    }

    // تهيئة قاعدة البيانات
    init() {
        // إنشاء الجداول إذا لم تكن موجودة
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('priceRequests')) {
            localStorage.setItem('priceRequests', JSON.stringify([]));
        }
        if (!localStorage.getItem('quotes')) {
            localStorage.setItem('quotes', JSON.stringify([]));
        }
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
        if (!localStorage.getItem('walletTransactions')) {
            localStorage.setItem('walletTransactions', JSON.stringify([]));
        }
        if (!localStorage.getItem('tickets')) {
            localStorage.setItem('tickets', JSON.stringify([]));
        }
        if (!localStorage.getItem('offices')) {
            localStorage.setItem('offices', JSON.stringify(this.getDefaultOffices()));
        }
        if (!localStorage.getItem('settings')) {
            localStorage.setItem('settings', JSON.stringify({
                nextUserId: 1,
                nextRequestId: 1,
                nextQuoteId: 1,
                nextOrderId: 1,
                nextTicketId: 1,
                exchangeRates: {
                    CNY_USD: 0.14,
                    LYD_USD: 0.21
                }
            }));
        }

        // إنشاء حساب أدمن افتراضي إذا لم يكن موجوداً
        this.createDefaultAdmin();
    }

    // مكاتب افتراضية
    getDefaultOffices() {
        return [
            {
                id: 1,
                name: 'مكتب طرابلس الرئيسي',
                city: 'طرابلس',
                address: 'شارع الجمهورية',
                phone: '0912345678',
                active: true
            },
            {
                id: 2,
                name: 'مكتب بنغازي',
                city: 'بنغازي',
                address: 'شارع جمال عبدالناصر',
                phone: '0923456789',
                active: true
            },
            {
                id: 3,
                name: 'مكتب مصراتة',
                city: 'مصراتة',
                address: 'شارع طرابلس',
                phone: '0934567890',
                active: true
            }
        ];
    }

    // إنشاء حساب أدمن افتراضي
    createDefaultAdmin() {
        const users = this.getAll('users');
        const adminExists = users.some(u => u.isAdmin);
        
        if (!adminExists) {
            this.insert('users', {
                id: this.getNextId('userId'),
                fullName: 'المدير العام',
                email: 'admin@baridex.com',
                password: 'admin123', // في الواقع يجب تشفيرها
                phone: '0910000000',
                isAdmin: true,
                officeId: 1,
                walletBalance: 0,
                createdAt: new Date().toISOString(),
                active: true
            });
        }
    }

    // الحصول على ID جديد
    getNextId(type) {
        const settings = JSON.parse(localStorage.getItem('settings'));
        const idField = 'next' + type.charAt(0).toUpperCase() + type.slice(1);
        const currentId = settings[idField];
        settings[idField] = currentId + 1;
        localStorage.setItem('settings', JSON.stringify(settings));
        return currentId;
    }

    // الحصول على كل السجلات من جدول
    getAll(table) {
        return JSON.parse(localStorage.getItem(table)) || [];
    }

    // الحصول على سجل واحد بشرط
    getOne(table, condition) {
        const items = this.getAll(table);
        return items.find(condition);
    }

    // الحصول على سجلات متعددة بشرط
    getMany(table, condition) {
        const items = this.getAll(table);
        if (condition) {
            return items.filter(condition);
        }
        return items;
    }

    // إضافة سجل جديد
    insert(table, data) {
        const items = this.getAll(table);
        items.push(data);
        localStorage.setItem(table, JSON.stringify(items));
        return data;
    }

    // تحديث سجل
    update(table, condition, newData) {
        const items = this.getAll(table);
        const index = items.findIndex(condition);
        if (index !== -1) {
            items[index] = { ...items[index], ...newData };
            localStorage.setItem(table, JSON.stringify(items));
            return items[index];
        }
        return null;
    }

    // حذف سجل
    delete(table, condition) {
        let items = this.getAll(table);
        items = items.filter(item => !condition(item));
        localStorage.setItem(table, JSON.stringify(items));
        return true;
    }

    // مسح كل البيانات (للتجربة فقط)
    clearAll() {
        localStorage.clear();
        this.init();
    }
}

// إنشاء نسخة واحدة من قاعدة البيانات
const db = new BaridexDB();