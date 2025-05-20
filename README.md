# Registration-app
Candidate Registration App
This is a simple React application for registering candidates with the following details:

- Full Name

- Email

- Mobile Number

- Gender

- Skills

- Profile Picture

The app also includes form validations, image preview, persistent storage using localStorage, and an option to delete submitted entries.

✨ ## Features
✅ Real-time form validations

✅ Preview uploaded profile image before submitting

✅ Display all submitted entries with image

✅ Delete individual entries

✅ Save data to localStorage so it persists across reloads

🛠️ Tech Stack
- React (Functional Components + Hooks)
- CSS

📦 Installation
Clone the repository:


git clone https://github.com/your-username/candidate-registration-app.git
cd candidate-registration-app
Install dependencies:


npm install
Start the development server:


npm start
Open in browser at http://localhost:3000

📄 Usage
- Fill out all required form fields.

- Upload a profile picture (image).

- Click Submit to save the candidate's information.

- Submitted entries will appear below the form.

- Click the Delete button to remove any entry.

✅ Validations
- Full Name must not be empty.

- Email must include "@".

- Mobile number must be exactly 10 digits.

- At least 2 skills must be selected.

- Gender selection is required.

- Profile picture upload is mandatory.
- Data is saved in localStorage, so refreshing the page will not erase previously submitted entries.

📁 Folder Structure

candidate-registration-app/
│
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
