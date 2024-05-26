# FULL PROJECT REACT x DJANGO

---

## Running the Project

#### Clone the Repository with git clone.

## Backend Setup

### Set Environment variables in .env file in backend folder

#### Create A Virtual Environment.

```
pip install virtualenv
cd backend
python<version> -m venv <virtual-environment-name>
```

#### Activate the Virtual Environment.

```
mac: source env/bin/activate
windows:
 env/Scripts/activate.bat //In CMD
 env/Scripts/Activate.ps1 //In Powershel

```

#### Install Required Dependencies

```
pip install -r requirements.txt
```

#### Make Migrations

```
python manage.py migrate
```

#### Run the Server

```
python manage.py runserver localhost:8000
```

## Frontend Setup

### Change the server domain in frontend/static/data.js

#### Installation

```
cd frontend
npm install
```

#### Run the Server

npm run dev


