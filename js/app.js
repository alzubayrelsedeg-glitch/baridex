// ====================================
// الوظائف العامة - Baridex
// ====================================

// تنسيق التاريخ والوقت
function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('ar-LY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// تنسيق التاريخ فقط
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-LY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// تنسيق المبلغ المالي
function formatMoney(amount, currency = 'USD') {
    const formatted = parseFloat(amount).toFixed(2);
    if (currency === 'USD') {
        return `$${formatted}`;
    } else if (currency === 'CNY') {
        return `¥${formatted}`;
    }
    return `${formatted} ${currency}`;
}

// عرض رسالة
function showMessage(message, type = 'info') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    const messageDiv = document.createElement('div');
    messageDiv.className = 'alert alert-' + type;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        background: ${colors[type]};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideDown 0.3s ease;
    `;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// التحقق من رقم الهاتف الليبي
function isValidLibyanPhone(phone) {
    const re = /^(091|092|093|094|095)\d{7}$/;
    return re.test(phone);
}

// الحصول على اسم المنصة بالعربية
function getPlatformName(platform) {
    const platforms = {
        'alibaba': 'علي بابا',
        '1688': '1688',
        'taobao': 'تاوباو',
        'pinduoduo': 'بيندودو',
        'yiwugo': 'ييوو جو',
        'yiwutrade': 'ييوو تريد'
    };
    return platforms[platform] || platform;
}

// الحصول على اسم حالة الطلب بالعربية
function getOrderStatusName(status) {
    const statuses = {
        'pending_purchase': 'بانتظار الشراء من المورد',
        'purchased': 'تم الشراء من المورد',
        'arrived_china': 'وصل إلى مخزن الصين',
        'consolidated': 'تم ضمّه في شحنة مجمعة',
        'shipped': 'تم الشحن من الصين',
        'arrived_libya': 'وصل إلى مخزن ليبيا',
        'ready_pickup': 'جاهز للاستلام من المكتب',
        'completed': 'مكتمل - تم الاستلام',
        'cancelled': 'ملغي'
    };
    return statuses[status] || status;
}

// الحصول على لون حالة الطلب
function getOrderStatusColor(status) {
    const colors = {
        'pending_purchase': '#f59e0b',
        'purchased': '#3b82f6',
        'arrived_china': '#8b5cf6',
        'consolidated': '#6366f1',
        'shipped': '#14b8a6',
        'arrived_libya': '#10b981',
        'ready_pickup': '#059669',
        'completed': '#22c55e',
        'cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
}

// تأكيد قبل الإجراء
function confirmAction(message) {
    return confirm(message);
}

// إضافة أنيميشن CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);