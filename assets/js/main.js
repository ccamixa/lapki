document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    burgerBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        });
    });
    
    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && e.target !== burgerBtn) {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
        }
    });
});
   


document.addEventListener('DOMContentLoaded', function() {
    // Обработка выбора всех товаров
    const selectAll = document.getElementById('select-all');
    selectAll.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.product input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    });
    
    // Обработка применения купона
    const applyCouponBtn = document.querySelector('.coupon-input button');
    applyCouponBtn.addEventListener('click', function() {
        const couponInput = document.querySelector('.coupon-input input');
        const couponCode = couponInput.value.trim();
        
        if (couponCode) {
            alert(`Купон "${couponCode}" применен!`);
            // Здесь можно добавить логику применения скидки
        } else {
            alert('Пожалуйста, введите код купона');
        }
    });
    
    // Обработка изменения количества товаров
    const quantityControls = document.querySelectorAll('.quantity');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const input = control.querySelector('.quantity-input');
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartTotals();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
            updateCartTotals();
        });
        
        input.addEventListener('change', () => {
            if (parseInt(input.value) < 1) {
                input.value = 1;
            }
            updateCartTotals();
        });
    });
    
    // Функция обновления итоговых значений
    function updateCartTotals() {
        const products = document.querySelectorAll('.product');
        let totalItems = 0;
        let subtotal = 0;
        
        products.forEach(product => {
            const quantity = parseInt(product.querySelector('.quantity-input').value);
            const priceText = product.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
            
            totalItems += quantity;
            subtotal += quantity * price;
        });
        
        document.querySelector('.total-items').textContent = `${totalItems} ${getNoun(totalItems, 'товар', 'товара', 'товаров')}`;
        document.querySelector('.subtotal').textContent = subtotal.toFixed(2) + ' ₽';
        document.querySelector('.total-price').textContent = subtotal.toFixed(2) + ' ₽';
    }
    
    // Функция для правильного склонения слова "товар"
    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        question.addEventListener('click', function() {
            // Закрываем все другие открытые панели
            questions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    const otherPanel = q.nextElementSibling;
                    otherPanel.style.maxHeight = null;
                    otherPanel.style.padding = '0 20px';
                }
            });
            
            // Переключаем текущую панель
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.padding = '0 20px';
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                panel.style.padding = '0 20px 15px';
            }
        });
    });
    
    // Закрытие при клике вне аккордеона
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.question') && !e.target.closest('.panel')) {
            questions.forEach(q => {
                q.classList.remove('active');
                const panel = q.nextElementSibling;
                panel.style.maxHeight = null;
                panel.style.padding = '0 20px';
            });
        }
    });
});