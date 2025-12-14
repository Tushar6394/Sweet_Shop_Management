# 🚀 Your Sweet Shop Management System is Running!

## 🌐 Access Your Application

### Frontend Application
**Open in your browser:**
```
http://localhost:3000
```

### Backend API
**API Health Check:**
```
http://localhost:5000/health
```

## 📝 Quick Start Guide

### 1. Register a New User
1. Go to `http://localhost:3000`
2. Click "Sign up" or navigate to `/register`
3. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
4. Click "Sign Up"

### 2. Login
1. Use your registered email and password
2. Click "Sign In"
3. You'll be redirected to the dashboard

### 3. Explore the Dashboard
- View all available sweets
- Search sweets by name or category
- Filter by category
- Purchase sweets (decreases quantity)
- View stock levels

### 4. Admin Features (Optional)
To test admin features, update a user's role in the database:

```bash
psql sweet_shop_db
```

Then run:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Admin users can:
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory

## 🎨 Features to Try

1. **Search Functionality**
   - Type in the search bar to find sweets by name or category

2. **Category Filter**
   - Use the dropdown to filter by category

3. **Purchase Flow**
   - Click "Purchase" on any sweet
   - Stock decreases automatically
   - Out of stock items show "Out of Stock" button

4. **Admin Panel** (if admin)
   - Click "Add Sweet" to create new products
   - Click edit icon (✏️) to modify sweets
   - Click delete icon (🗑️) to remove sweets
   - Click "Restock" to add inventory

## 🛑 To Stop Servers

Press `Ctrl+C` in the terminal windows where servers are running, or:

```bash
# Kill backend
lsof -ti:5000 | xargs kill -9

# Kill frontend
lsof -ti:3000 | xargs kill -9
```

## 📸 Screenshots Locations

The application features:
- Beautiful glassmorphism design
- Animated gradient backgrounds
- Responsive layout
- Smooth transitions
- Modern UI components

Enjoy exploring your Sweet Shop Management System! 🍬

