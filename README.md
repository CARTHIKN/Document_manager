# Document_manager
Doc_manager is a comprehensive document management application designed to streamline file handling. Users can effortlessly upload their files, which are securely stored in an AWS S3 bucket. The application allows users to view their stored files, download them to local storage, and delete files as needed, providing a complete solution for managing and organizing documents.

## Working Demo

https://youtu.be/QD3aJZbyfWs

## Stack Used

This project is a developed with a Django REST Framework for the  backend and a React for the  frontend using Vite.


## Prerequisites

  * Python: Version 3.8 or higher
  * Node.js


## Installation

** Backend Setup**

  1. Clone the repository:
     ```bash
     git clone https://github.com/CARTHIKN/Document_manager.git

  2. Create a virtual environment:
     ```bash
     python -m venv venv

  3. Activate the virtual environment:
     * On Windows:

           venv\Scripts\activate
     * On macOS/Linux:

            source venv/bin/activate



  4. Navigate to the doc_manager directory:
     ```bash
     cd doc_manager


  5. Install the required Python packages:
     ```bash
     pip install -r requirements.txt


  6. Apply database migrations:
      ```bash
     python manage.py migrate
      ```

  7. Run the Django development server::
      ```bash
     python manage.py runserver


** Frontend Setup**

   1. Navigate to the frontend directory:
      ```bash
      cd frontend
      cd doc_manager
      ```
      
   2. Install the required Node.js packages:
      ```bash
      npm install

   3. Run the Vite development server:
      ```bash
      npm run dev



## Usage
 * The backend will be available at http://localhost:8000/.
 * The frontend will be available at http://localhost:5173/.


## Environment Variables

To ensure that the application functions correctly. Don't Forgot setup the .env file for the backend for the database and AWS S3 configuration with access key and secret access key.


## Setup

  1. Create a .env File:
     In the root directory of your backend(named doc_manager, where manage.py is located), create a file named .env. Provide the values based on the settings.py

  2. Import on settings.py:

     Import  the .env in settings.py and assign values correctly 


     
