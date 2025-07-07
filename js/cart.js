// Cart Management System with Local Storage
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.updateCartCount();
        this.updateCartTotal();
        this.updateFavoritesCount();
        this.setupEventListeners();
        this.renderCartItems();
        this.renderFavoriteItems();
    }

    // Local Storage Management
    loadCart() {
        const cart = localStorage.getItem('hatcraft_cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('hatcraft_cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    loadFavorites() {
        const favorites = localStorage.getItem('hatcraft_favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    saveFavorites() {
        localStorage.setItem('hatcraft_favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
    }

    // Cart Functions
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.updateCartTotal();
        this.showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
        this.renderCartItems();
        
        // Add visual feedback to product card
        const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
        if (productCard) {
            productCard.classList.add('added-to-cart');
            setTimeout(() => {
                productCard.classList.remove('added-to-cart');
            }, 600);
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartTotal();
        this.renderCartItems();
        this.showNotification('تم حذف المنتج من السلة', 'info');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.updateCartTotal();
                this.renderCartItems();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.updateCartTotal();
        this.renderCartItems();
        this.showNotification('تم إفراغ السلة', 'info');
    }

    // Favorites Functions
    addToFavorites(product) {
        const existingItem = this.favorites.find(item => item.id === product.id);
        
        if (!existingItem) {
            this.favorites.push({
                ...product,
                addedAt: new Date().toISOString()
            });
            this.saveFavorites();
            this.updateFavoritesCount();
            this.showNotification(`تم إضافة ${product.name} إلى المفضلة`, 'success');
            this.renderFavoriteItems();
            return true;
        }
        return false;
    }

    removeFromFavorites(productId) {
        this.favorites = this.favorites.filter(item => item.id !== productId);
        this.saveFavorites();
        this.updateFavoritesCount();
        this.renderFavoriteItems();
        this.showNotification('تم حذف المنتج من المفضلة', 'info');
    }

    isFavorite(productId) {
        return this.favorites.some(item => item.id === productId);
    }

    toggleFavorite(product) {
        if (this.isFavorite(product.id)) {
            this.removeFromFavorites(product.id);
            return false;
        } else {
            this.addToFavorites(product);
            return true;
        }
    }

    // UI Update Functions
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();
        
        cartCountElements.forEach(element => {
            element.textContent = Utils.formatArabicNumber(count);
            if (count > 0) {
                element.style.display = 'flex';
                element.classList.add('has-items');
            } else {
                element.style.display = 'none';
                element.classList.remove('has-items');
            }
        });
    }

    updateCartTotal() {
        const totalElements = document.querySelectorAll('.total-amount');
        const total = this.getCartTotal();
        
        totalElements.forEach(element => {
            element.textContent = Utils.formatArabicCurrency(total);
        });

        // Also update any cart total containers visibility
        const cartTotalContainers = document.querySelectorAll('.cart-total');
        cartTotalContainers.forEach(container => {
            if (this.cart.length === 0) {
                container.style.display = 'none';
            } else {
                container.style.display = 'block';
            }
        });
    }

    updateFavoritesCount() {
        const favCountElements = document.querySelectorAll('.favorites-count');
        const count = this.favorites.length;
        
        favCountElements.forEach(element => {
            element.textContent = Utils.formatArabicNumber(count);
            if (count > 0) {
                element.style.display = 'flex';
                element.classList.add('has-items');
            } else {
                element.style.display = 'none';
                element.classList.remove('has-items');
            }
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Cart icon click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-icon')) {
                this.toggleCartModal();
            }
            
            if (e.target.closest('.favorites-icon')) {
                this.toggleFavoritesModal();
            }
            
            if (e.target.closest('.add-to-cart-btn')) {
                const productData = this.getProductDataFromElement(e.target);
                if (productData) {
                    this.addToCart(productData);
                }
            }
            
            if (e.target.closest('.favorite-btn')) {
                const favoriteBtn = e.target.closest('.favorite-btn');
                const productData = this.getProductDataFromElement(favoriteBtn);
                if (productData) {
                    const isFav = this.toggleFavorite(productData);
                    this.updateFavoriteButton(favoriteBtn, isFav);
                }
            }
        });
    }

    getProductDataFromElement(element) {
        const productElement = element.closest('.collection-item');
        if (!productElement) return null;

        return {
            id: productElement.dataset.productId,
            name: productElement.querySelector('.collection-name').textContent,
            price: this.extractPrice(productElement.querySelector('.collection-price').textContent),
            image: productElement.querySelector('.collection-image').src,
            category: productElement.dataset.category || 'قبعات'
        };
    }

    extractPrice(priceText) {
        // Extract number from Arabic price text like "٢٩٩ ريال"
        const arabicNums = priceText.match(/[٠-٩]+/g);
        if (arabicNums) {
            const englishNum = arabicNums[0].replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
            return parseInt(englishNum);
        }
        return 0;
    }

    // Modal Functions
    toggleCartModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.toggle('active');
        } else {
            this.createCartModal();
        }
    }

    toggleFavoritesModal() {
        const modal = document.getElementById('favoritesModal');
        if (modal) {
            modal.classList.toggle('active');
        } else {
            this.createFavoritesModal();
        }
    }

    createCartModal() {
        const modal = document.createElement('div');
        modal.id = 'cartModal';
        modal.className = 'modal cart-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="arabic-title">سلة التسوق</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="cartItems"></div>
                    <div class="cart-total">
                        <div class="total-row">
                            <span class="arabic-text">المجموع:</span>
                            <span class="total-amount arabic-text">${Utils.formatArabicCurrency(this.getCartTotal())}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary clear-cart arabic-text">إفراغ السلة</button>
                    <button class="btn btn-primary checkout arabic-text">إتمام الشراء</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupModalEvents(modal);
        modal.classList.add('active');
        this.renderCartItems();
    }

    createFavoritesModal() {
        const modal = document.createElement('div');
        modal.id = 'favoritesModal';
        modal.className = 'modal favorites-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="arabic-title">المفضلة</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="favoriteItems"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupModalEvents(modal);
        modal.classList.add('active');
        this.renderFavoriteItems();
    }

    setupModalEvents(modal) {
        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Cart specific events
        if (modal.id === 'cartModal') {
            modal.querySelector('.clear-cart').addEventListener('click', () => {
                this.clearCart();
            });
            
            modal.querySelector('.checkout').addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    renderCartItems() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-message arabic-text">السلة فارغة</p>';
            // Ensure total is updated to 0 when cart is empty
            this.updateCartTotal();
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name arabic-text">${item.name}</h4>
                    <p class="item-price arabic-text">${Utils.formatArabicCurrency(item.price)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn minus" data-action="decrease">-</button>
                    <span class="quantity arabic-text">${Utils.formatArabicNumber(item.quantity)}</span>
                    <button class="qty-btn plus" data-action="increase">+</button>
                </div>
                <button class="remove-item" data-product-id="${item.id}">🗑️</button>
            </div>
        `).join('');

        // Always update total when rendering cart items
        this.updateCartTotal();

        // Setup item events
        this.setupCartItemEvents();
    }

    renderFavoriteItems() {
        const container = document.getElementById('favoriteItems');
        if (!container) return;

        if (this.favorites.length === 0) {
            container.innerHTML = '<p class="empty-message arabic-text">لا توجد منتجات في المفضلة</p>';
            return;
        }

        container.innerHTML = this.favorites.map(item => `
            <div class="favorite-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name arabic-text">${item.name}</h4>
                    <p class="item-price arabic-text">${Utils.formatArabicCurrency(item.price)}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary add-to-cart-from-fav arabic-text" data-product-id="${item.id}">
                        أضف للسلة
                    </button>
                    <button class="remove-favorite" data-product-id="${item.id}">🗑️</button>
                </div>
            </div>
        `).join('');

        // Setup favorite item events
        this.setupFavoriteItemEvents();
    }

    setupCartItemEvents() {
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.cart-item').dataset.productId;
                const action = e.target.dataset.action;
                const item = this.cart.find(item => item.id === productId);
                
                if (item) {
                    if (action === 'increase') {
                        this.updateQuantity(productId, item.quantity + 1);
                    } else if (action === 'decrease') {
                        this.updateQuantity(productId, item.quantity - 1);
                    }
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.removeFromCart(productId);
            });
        });
    }

    setupFavoriteItemEvents() {
        document.querySelectorAll('.add-to-cart-from-fav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                const item = this.favorites.find(item => item.id === productId);
                if (item) {
                    this.addToCart(item);
                }
            });
        });

        document.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.removeFromFavorites(productId);
            });
        });
    }

    updateFavoriteButton(button, isFavorite) {
        if (!button) return;
        
        const heartIcon = button.querySelector('i');
        if (!heartIcon) return;
        
        if (isFavorite) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            button.classList.add('active');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            button.classList.remove('active');
        }
        
        // Add visual feedback animation
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="arabic-text">${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Checkout Function
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('السلة فارغة', 'warning');
            return;
        }
        
        // Here you would integrate with a payment system
        this.showNotification('سيتم توجيهك لصفحة الدفع قريباً', 'info');
        console.log('Checkout initiated with items:', this.cart);
    }
}

// Initialize Cart Manager
window.cartManager = new CartManager(); 