
# Magical Meals

Magical Meals is an online food ordering system designed for college canteens. Students can log in using their college ID, browse the menu, and place food orders online.

## Features

### Basic Features
- **User Authentication:** Users can sign up and log in with their college IDs, with separate accounts for students and canteen owners.
- **Menu Browsing:** Easily browse the canteen's menu, complete with descriptions and prices for all food items.
- **Food Ordering:** Customize food items according to personal preferences and place orders seamlessly.
- **Payment Options:** Convenient payments using credit/debit cards, net banking, or digital wallets.
- **Order Tracking:** Track orders in real-time and receive updates on order status, pickup time, and location.

### Advanced Features
- **Feedback & Ratings:** Share feedback and rate dining experiences to help the canteen improve its services.
- **Pre-ordering:** Pre-order meals to ensure they are ready at preferred times, avoiding long queues.

## Tech Stack

- **Front-end:** HTML, CSS, JavaScript, Bootstrap
- **Database:** MongoDB
- **Back-end:** Node.js, Express.js

## Installation

### Prerequisites
- Node.js
- npm (Node package manager)
- MongoDB (local or cloud instance)

### Setting Up the Project

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/magical-meals.git
    cd magical-meals
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Set Up the Database:**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGODB_URI=mongodb://localhost:27017/magical_meals
    ```

4. **Run the Application:**
    ```bash
    npm start
    ```
    The application will be available at [http://localhost:3000/](http://localhost:3000/) (or your specified port).

## Usage

- **Login:**
  - Navigate to the login page.
  - Enter your college ID and password.

- **Browse Menu:**
  - Once logged in, view the available food items.

- **Place Order:**
  - Select items to order and place your order.

- **View Order History:**
  - Check previous orders and track current ones.

## Contributing

Feel free to submit issues or pull requests. Please ensure your contributions adhere to the project's coding standards.



