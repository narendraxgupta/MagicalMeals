

                                                                    # Magical Meals

Magical Meals is an online food ordering system designed for college canteens. Students can log in using their college ID, browse the menu, and place food orders online.

## Features

- **Student Login**: Secure login system using college ID.
- **Menu Browsing**: View and browse the food menu.
- **Order Placement**: Place and manage food orders.
- **Order History**: View previous orders and track current ones.

## Technologies Used

- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Implemented with Passport.js or similar

## Installation

### Prerequisites

- **Node.js**
- **npm** (Node package manager)
- **MongoDB** (local or cloud instance)

### Setting Up the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/magical-meals.git
   cd magical-meals
   ```

2. **Install Dependencies**

   Install the required npm packages:

   ```bash
   npm install
   ```

3. **Set Up the Database**

   Make sure you have MongoDB installed and running. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/magical_meals
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000/` (or your specified port).

## Usage

1. **Login**

   - Navigate to the login page.
   - Enter your college ID and password.

2. **Browse Menu**

   - Once logged in, you can view the available food items.

3. **Place Order**

   - Select the items you want to order and place your order.

4. **View Order History**

   - Check your previous orders and track current orders.

## Contributing

Feel free to submit issues or pull requests. Please ensure your contributions adhere to the project's coding standards.

