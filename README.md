
Built by https://www.blackbox.ai

---

# Origami Smoke Paper Folding Wall

## Project Overview

The Origami Smoke Paper Folding Wall is an interactive web application that enables users to create and manipulate a visual representation of origami paper folding with smoke effects. This project leverages Paper.js, a powerful JavaScript library for vector graphics, to deliver a unique and engaging user experience.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd origami-smoke-wall
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the local server**:
   You can use the provided script to start a simple HTTP server:
   ```bash
   npm start
   ```
   Open your browser and navigate to `http://localhost:8000` to view the application.

## Usage

Once the server is running, open your web browser and navigate to `http://localhost:8000`. You'll be presented with a control panel where you can:

- Adjust the number of rows and columns using the range sliders.
- Toggle the smoke effect on or off.
- Refresh the canvas to see changes based on the control panel settings.
- Download the current canvas as an image.

## Features

- **Interactive Controls**: Users can adjust the number of rows and columns through sliders.
- **Smoke Effect**: A toggle to enable or disable the smoke animation.
- **Download Option**: Save your canvas design as an image.
- **Responsive Design**: The application is built to be accessible on various devices.

## Dependencies

The project uses the following dependencies specified in `package.json`:

- **Paper.js**: A vector graphics scripting framework that simplifies the development of complex graphics.

```json
"dependencies": {
  "paper": "^0.12.15"
}
```

## Project Structure

The project files are organized as follows:

```
origami-smoke-wall/
│
├── index.html          # Main HTML file for the application
├── package.json        # Contains metadata about the project and its dependencies
├── package-lock.json   # Lock file for exact dependency versions
├── css/
│   └── style.css       # CSS styles for the application
└── js/
    └── app.js          # Main JavaScript file implementing the application logic
```

## License

This project is licensed under the [MIT License](LICENSE).