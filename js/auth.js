const Auth = {
    register: function(userData) {
        // التحقق من وجود البريد الإلكتروني
        const existingUser = db.getOne('users', u => u.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' };
        }

        const newUser = {
            id: db.getNextId('userId'),
            ...userData,
            isAdmin: false, // افتراضياً مستخدم عادي
            walletBalance: 0.00,
            createdAt: new Date().toISOString(),
            active: true
        };

        db.insert('users', newUser);
        return { success: true, message: 'تم التسجيل بنجاح' };
    },

    login: function(email, password) {
        const user = db.getOne('users', u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
        }

        if (!user.active) {
            return { success: false, message: 'تم تعطيل هذا الحساب، يرجى مراجعة الإدارة' };
        }

        // حفظ الجلسة
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user: user };
    },

    logout: function() {
        sessionStorage.removeItem('currentUser');
        // العودة للمجلد الرئيسي عند الخروج
        // ../login.html لأننا عادة نكون داخل admin/ أو customer/
        window.location.href = '../login.html'; 
    },

    getCurrentUser: function() {
        const userStr = sessionStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    requireAuth: function() {
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = '../login.html';
            return null;
        }
        return user;
    },

    requireAdmin: function() {
        const user = this.requireAuth();
        if (user && !user.isAdmin) {
            window.location.href = '../customer/dashboard.html';
            return null;
        }
        return user;
    },

    requireCustomer: function() {
        const user = this.requireAuth();
        if (user && user.isAdmin) {
            window.location.href = '../admin/dashboard.html';
            return null;
        }
        return user;
    },
    
    updateCurrentUser: function() {
        const current = this.getCurrentUser();
        if(current) {
            const updated = db.getOne('users', u => u.id === current.id);
            sessionStorage.setItem('currentUser', JSON.stringify(updated));
        }
    }
};