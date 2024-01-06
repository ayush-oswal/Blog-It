# Blog-It

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/ayush-oswal/Blog-It.svg)](https://github.com/ayush-oswal/Blog-It/issues)
[![GitHub stars](https://img.shields.io/github/stars/ayush-oswal/Blog-It.svg)](https://github.com/ayush-oswal/Blog-It/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ayush-oswal/Blog-It.svg)](https://github.com/ayush-oswal/Blog-It/network)

Blog-It is a MERN (MongoDB, Express.js, React, Node.js) stack application that empowers users to create, view, and search for blog posts. It incorporates robust user authentication using bcrypt, JWT, and cookies, allowing users to log in, register, and engage with the community through comments. Only the author of a post has the authority to update or delete it.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [User Authentication](#user-authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up Blog-It locally, follow these comprehensive steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayush-oswal/Blog-It
   cd Blog-It `

1.  Install dependencies for both the client and server:

    -   Navigate to the `client` directory and install client dependencies:


        `cd client
        npm install`

    -   Move back to the root directory and install server dependencies:


        `cd ..
        cd server
        npm install`

2.  Configure Cloudinary for image storage:

    -   Sign up for a [Cloudinary](https://cloudinary.com/) account.

    -   Retrieve your Cloudinary API key, API secret, and cloud name.

    -   Create a `.env` file in the `server` directory.

    -   Add the following variables to the `.env` file:



        `CLOUDINARY_CLOUD_NAME=your_cloud_name`
        
        `CLOUDINARY_API_KEY=your_api_key`
        
        `CLOUDINARY_API_SECRET=your_api_secret`

    Ensure that you replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials.

3.  Run the application:

    -   In the `client` directory:


        `cd client
        npm start`

    -   In the `server` directory:


        `cd ..
        cd server
        node app.js`

4.  Access the application:

    -   Open your browser and navigate to `http://localhost:3000` to view the Blog-It application.

This setup process covers cloning the repository, installing dependencies, and configuring Cloudinary for image storage. Make sure to follow each step carefully to ensure a smooth installation process. If you encounter any issues, refer to the documentation or seek help from the community.

# Features


## User Authentication:

-   Secure user authentication using bcrypt, JWT, and cookies.
-   Login and registration functionalities.

## Post Management:

-   Create, update, and delete posts using React Quill for an enhanced text editor experience.
-   Upload and display images with Cloudinary integration.
-   View and search for posts.

## Comment System:

-   Users can comment on posts.
-   Commenting requires user authentication.

## Author Pages:

-   Individual pages for each author, showcasing their posts.

# User Authentication


Blog-It uses bcrypt for password hashing, JWT for secure user authentication, and cookies for a seamless user experience. To contribute, familiarize yourself with these technologies and the authentication flow in the application.

# Contributing


Contributions are welcome! Here's how you can contribute to Blog-It:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature`.
3.  Make your changes and commit them: `git commit -m 'Add new feature'`.
4.  Push to your branch: `git push origin feature/your-feature`.
5.  Submit a pull request.

Please ensure that your pull request adheres to the contributing guidelines.

License
-------

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.
