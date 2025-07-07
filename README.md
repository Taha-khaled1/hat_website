# صانع القبعات - Hat Craft E-commerce Store

A premium Arabic e-commerce website for luxury hats with complete shopping functionality.

## 🛍️ E-commerce Features

### Shopping Cart
- **Add to Cart**: Click the "أضف للسلة" button on any product
- **Cart Icon**: Shows item count with Arabic numerals
- **Cart Modal**: Full cart management with quantity controls
- **Local Storage**: Cart persists between sessions
- **Remove Items**: Individual item removal
- **Quantity Control**: Increase/decrease quantities
- **Total Calculation**: Real-time total in Arabic currency

### Favorites/Wishlist
- **Heart Icon**: Click to add/remove from favorites
- **Visual Feedback**: Filled heart for favorited items
- **Favorites Modal**: View all favorite items
- **Local Storage**: Favorites persist between sessions
- **Add to Cart**: Move items from favorites to cart

### Product Management
- **6 Unique Products**: Each with unique ID and category
- **Arabic Names**: Traditional Arabic product names
- **Pricing**: Arabic numerals with Riyal currency
- **Categories**: كلاسيكية، حديثة، تراثية، حضرية، فاخرة، معاصرة
- **Product Data**: Stored with ID, name, price, image, category

### User Experience
- **Notifications**: Toast notifications for all actions
- **RTL Support**: Complete right-to-left layout
- **Responsive**: Works on all devices
- **Arabic Fonts**: Beautiful Cairo and Amiri fonts
- **Smooth Animations**: Hover effects and transitions

## 📁 File Structure

```
ecommerce/
├── index.html              # Main HTML file with e-commerce structure
├── css/
│   ├── base.css           # Global styles and Arabic typography
│   ├── navigation.css     # Navigation with cart/favorites icons
│   ├── hero.css           # Hero section styles
│   ├── collection.css     # Product grid and cards
│   ├── story.css          # Brand story section
│   ├── newsletter.css     # Newsletter signup
│   ├── footer.css         # Footer styles
│   ├── animations.css     # All animations and effects
│   └── ecommerce.css      # E-commerce specific styles
├── js/
│   ├── main.js            # Core application logic
│   ├── animations.js      # Animation controllers
│   ├── utils.js           # Utility functions
│   └── cart.js            # Shopping cart and favorites management
├── images/
│   ├── logo_with_background.png
│   ├── logo_without_background.png
│   ├── video.mp4          # Hero background video
│   └── [a-l].png          # Product images
└── README.md
```

## 🛒 How to Use the E-commerce Features

### Adding Products to Cart
1. Hover over any product in the collection
2. Click "أضف للسلة" (Add to Cart) button
3. See the cart icon update with item count
4. Get confirmation notification

### Managing Cart
1. Click the cart icon (🛒) in navigation
2. View all items with images and prices
3. Adjust quantities with +/- buttons
4. Remove items with trash icon
5. See total price update in real-time
6. Click "إتمام الشراء" for checkout

### Managing Favorites
1. Click the heart icon on any product
2. Icon fills when added to favorites
3. Click favorites icon (❤️) in navigation
4. View all favorite items
5. Add favorites to cart directly
6. Remove from favorites

### Data Persistence
- Cart items are saved to `localStorage` as `hatcraft_cart`
- Favorites are saved to `localStorage` as `hatcraft_favorites`
- Data persists between browser sessions
- Automatic loading on page refresh

## 🎨 Design Features

### Arabic Typography
- **Cairo Font**: Modern Arabic font for body text
- **Amiri Font**: Traditional Arabic font for headings
- **RTL Layout**: Complete right-to-left support
- **Arabic Numerals**: ٠١٢٣٤٥٦٧٨٩ format

### Visual Effects
- **Hover Animations**: Product cards lift and show buttons
- **Smooth Transitions**: All interactions are animated
- **Loading States**: Visual feedback during operations
- **Notification System**: Toast notifications for user actions

### Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Touch Friendly**: Large buttons and touch targets
- **Adaptive Layout**: Grid adjusts to screen size
- **Mobile Modals**: Full-screen on mobile devices

## 🔧 Technical Implementation

### Local Storage Structure
```javascript
// Cart items
localStorage.hatcraft_cart = [
  {
    id: "hat-001",
    name: "الأناقة الكلاسيكية",
    price: 299,
    image: "images/a.png",
    category: "كلاسيكية",
    quantity: 2,
    addedAt: "2024-01-01T00:00:00.000Z"
  }
]

// Favorites
localStorage.hatcraft_favorites = [
  {
    id: "hat-002",
    name: "الرقي الحديث",
    price: 349,
    image: "images/s.png",
    category: "حديثة",
    addedAt: "2024-01-01T00:00:00.000Z"
  }
]
```

### Cart Manager API
```javascript
// Add to cart
cartManager.addToCart(productData);

// Remove from cart
cartManager.removeFromCart(productId);

// Update quantity
cartManager.updateQuantity(productId, newQuantity);

// Add to favorites
cartManager.addToFavorites(productData);

// Toggle favorite
cartManager.toggleFavorite(productData);

// Get cart total
const total = cartManager.getCartTotal();
```

### Product Data Structure
```javascript
const productData = {
  id: "hat-001",           // Unique identifier
  name: "الأناقة الكلاسيكية",  // Arabic name
  price: 299,              // Price in Riyals
  image: "images/a.png",   // Product image
  category: "كلاسيكية"      // Product category
};
```

## 🚀 Future Enhancements

### Payment Integration
- Integrate with payment gateways (Stripe, PayPal)
- Support for Saudi payment methods (STC Pay, mada)
- Multiple currency support

### User Accounts
- User registration and login
- Order history
- Saved addresses
- Profile management

### Advanced Features
- Product reviews and ratings
- Size selection
- Color variants
- Search and filtering
- Related products

### Analytics
- Google Analytics integration
- Conversion tracking
- User behavior analysis
- Performance monitoring

## 🌟 Key Features Summary

✅ **Complete Shopping Cart** with quantity management  
✅ **Favorites/Wishlist** functionality  
✅ **Local Storage** persistence  
✅ **Arabic RTL** support  
✅ **Responsive Design** for all devices  
✅ **Beautiful UI/UX** with smooth animations  
✅ **6 Unique Products** with proper data structure  
✅ **Notification System** for user feedback  
✅ **Modal Management** for cart and favorites  
✅ **Currency Formatting** in Arabic numerals  

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- Lazy loading for images
- Debounced scroll events
- Throttled animations
- Efficient DOM manipulation
- Minimal dependencies

---

**Built with love for Arabic e-commerce** ❤️

*This is a complete e-commerce solution ready for production use with payment gateway integration.* 