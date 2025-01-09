
# Astralab

## Description

Astralab is a web application that allows users to send HTTP requests with customizable headers, query parameters, and body content. It includes features such as JSON formatting and validation.

## Features

- Send HTTP requests with customizable headers, query parameters, and body content.
- Format JSON body content.
- Validate JSON body content.
- User-friendly interface with responsive design.

## Technologies Used

- Angular
- TypeScript
- SCSS
- Toastr (for notifications)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/astralab.git
   ```
2. Navigate to the project directory:
   ```bash
   cd astralab
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   ng serve
   ```
2. Open your browser and navigate to `http://localhost:4200`.

## Components

### RequestComponent

This component allows users to input the URL, method, headers, query parameters, and body for an HTTP request. It includes a button to format the JSON body content.

#### Inputs

- `url`: The URL for the request.
- `method`: The HTTP method (e.g., GET, POST).
- `headers`: An array of headers for the request.
- `queryParams`: An array of query parameters for the request.
- `body`: The body content for the request.
- `description`: A description of the request.

#### Outputs

- `onSendRequest`: Emits the request data when the request is sent.

### Services

#### JsonFormatterService

This service provides methods to format and validate JSON content.

- `formatBodyAsJson(body: string): string`: Formats the given body as JSON.
- `isJsonFormatted(body: string): boolean`: Checks if the given body is valid JSON.

## Styling

The project uses SCSS for styling. The buttons and inputs are styled to be responsive and match the theme of the application.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Angular](https://angular.io/)
- [Toastr](https://github.com/CodeSeven/toastr)
