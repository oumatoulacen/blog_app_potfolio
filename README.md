# Blog App

## Description

This is a blog app that allows users to create, read, update, and delete blog posts. It provides a user-friendly interface for managing blog content.

## Features

- User authentication: Users can sign up, log in, and log out.
- Create blog posts: Users can create new blog posts with a title, content, and optional image.
- Read blog posts: Users can view all blog posts or click on a specific post to read its details.
- Update blog posts: Users can edit the title, content, or image of their own blog posts.
- Delete blog posts: Users can delete their own blog posts.
- Search functionality: Users can search for specific blog posts based on keywords.
- Categories and tags: Users can assign categories and tags to their blog posts for better organization and searchability.
- Responsive design: The app is optimized for different screen sizes and devices.

## Technologies Used

- Front-end: HTML, CSS, JavaScript, React
- Back-end: Node.js, Express.js
- Database: MongoDB

## Installation


### Backend (Express.js)

1. Clone the repository:

     ```
    git clone `git clone https://github.com/oumatoulacen/blog_app_potfolio.git
    ```

2. Navigate to the backend directory:

    ```
    cd blog_app_potfolio/server
    ```

3. Install the dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=3000
    MONGODB_URL=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

5. Start the server:

    ```
    npm start
    ```

### Frontend (React)

1. Navigate to the frontend directory:

    ```
    cd blog_app_potfolio/client
    ```

2. Install the dependencies:

    ```
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variable:

    ```
    REACT_APP_API_URL=http://localhost:3000
    ```

4. Start the development server:

    ```
    npm start
    ```

Now you should have the backend and frontend of the Blog App up and running. You can access the app by opening your browser and navigating to `http://localhost:5173/`.

## Usage

1. Sign up for a new account or log in with your existing credentials.
2. Create a new blog post by clicking on the "Write" button.
3. View all blog posts on the home page or click on 'read more' on a specific post to read its details.
4. Edit or delete your own blog posts by clicking on the respective buttons.
5. Use the search bar to find specific blog posts based on keywords.
6. Assign categories and tags to your blog posts for better organization and searchability.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contact

For any questions or inquiries, please contact [oumatoulacen@gmail.com](mailto:oumatoulacen@gmail.com).
