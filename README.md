# Node Express TypeScript CRUD Application with MongoDB

This is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express.js, MongoDB, and TypeScript.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd node-express-typescript
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and define your environment variables. For example:

    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb://db:27018/mydatabase
    ```

    Replace `MONGODB_URI` with your MongoDB connection string. If you're using Docker, `db` is the service name defined in `docker-compose.yml`.

5. Start the application:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- **Create:** Send a POST request to `/api/items` with JSON data containing the item details.
- **Read:** Send a GET request to `/api/items` to retrieve all items, or `/api/items/:id` to retrieve a specific item.
- **Update:** Send a PUT request to `/api/items/:id` with JSON data containing the updated item details.
- **Delete:** Send a DELETE request to `/api/items/:id` to delete a specific item.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
