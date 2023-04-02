# Flatdango

Flatdango is a web application that allows users to purchase movie tickets from the Flatiron Movie Theater. This project is part of the week 3 code challenge for implementing a 'mini' web application using JavaScript.

Features
See the first movie's details, including its poster, title, runtime, showtime, and available tickets when the page loads. The number of available tickets is derived by subtracting the number of tickets_sold from the theater's capacity. A GET request is made to the endpoint /films/1 to retrieve the film data.
See a menu of all movies on the left side of the page in the ul#films element when the page loads. A GET request is made to the endpoint /films to retrieve the film data.
Buy a ticket for a movie. After clicking the "Buy Ticket" button, the number of available tickets decreases on the frontend. The user cannot buy a ticket if the showing is sold out (if there are 0 tickets available).

Bonus Features
Click on a movie in the menu to replace the currently displayed movie's details with the new movie's details. An additional GET request is made to retrieve the movie's details.
When a movie is sold out, indicate that the movie is sold out by changing the button text to "Sold Out". The film item in the ul#films menu is updated by adding a class of sold-out to the film.
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/{DAVID-TECH-GURU}/flatdango.git
Install the dependencies:

Copy code
npm install
Start the development server:

sql
Copy code
npm start
Open the application in your browser:

arduino
Copy code
http://localhost:3001

Technologies Used
JavaScript
HTML
CSS
JSON DB Server

Credits
This project was created by [DAVID WACHIRA MAINA]. Special thanks to the instructors and TAs at Flatiron School for their support and guidance.

MIT License

Copyright (c) [2023] [DAVID WACHIRA MAINA]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
