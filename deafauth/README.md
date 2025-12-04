# DeafAuth - Flask Authentication Template

A lightweight, modular Flask-based authentication system template designed for quick project starts.

## Features

- **User Signup**: Register new users with email and password
- **Email Verification**: Basic email verification mechanism
- **Secure Login**: Password hashing with Werkzeug
- **JWT Tokens**: Stateless authentication with JSON Web Tokens
- **Protected Routes**: Decorator-based route protection
- **SQLite Database**: Built-in SQLite support (easily adaptable to PostgreSQL, MySQL, etc.)

## Structure

```
deafauth/
├── app.py                 # Main Flask application entry point
├── deafauth/              # Authentication blueprint module
│   ├── __init__.py       # Blueprint initialization
│   ├── routes.py         # API endpoints (signup, login, verify)
│   ├── models.py         # User database model
│   └── auth.py           # JWT token handling and decorators
├── static/               # Static files (CSS, JS, images)
├── templates/            # HTML templates (optional)
└── requirements.txt      # Python dependencies
```

## Quick Start

### 1. Installation

```bash
# Clone or copy the deafauth template
cd deafauth

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

Set environment variables (optional):

```bash
# Set a secret key for JWT tokens (REQUIRED in production)
export SECRET_KEY="your-secret-key-here"

# Set database URL (defaults to SQLite)
export DATABASE_URL="sqlite:///deafauth.db"

# Set Flask environment
export FLASK_ENV="development"
```

### 3. Run the Application

```bash
# Run the development server
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /auth/health
```
Returns service status.

### User Signup
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_verified": false,
    "created_at": "2024-01-01T00:00:00"
  },
  "verification_token": "abc123...",
  "note": "In production, verification token would be sent via email"
}
```

### Email Verification
```
GET /auth/verify/<verification_token>
```

Response:
```json
{
  "message": "Email verified successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_verified": true,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### User Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_verified": true,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_verified": true,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

## Usage in Your Application

### Protecting Routes

Use the `@token_required` decorator to protect routes:

```python
from deafauth.auth import token_required

@app.route('/protected')
@token_required
def protected_route(user_id):
    # user_id is automatically passed by the decorator
    return jsonify({'message': f'Hello user {user_id}!'})
```

### Using the Application Factory

```python
from app import create_app

# Create app with custom configuration
app = create_app({
    'SECRET_KEY': 'custom-secret',
    'SQLALCHEMY_DATABASE_URI': 'postgresql://user:pass@localhost/dbname'
})
```

## Workflow

1. **Signup**: User registers with email and password
2. **Verification**: User verifies email using the verification token
3. **Login**: User logs in and receives a JWT token
4. **Protected Access**: User includes the token in Authorization header for protected routes

## Security Considerations

⚠️ **Important for Production:**

1. **Secret Key**: **REQUIRED** - Set a strong `SECRET_KEY` environment variable. Generate with: `python -c "import secrets; print(secrets.token_hex(32))"`
2. **Environment**: Set `FLASK_ENV=production` to enable production security features
3. **Email Service**: Integrate a real email service for verification emails (SendGrid, AWS SES, etc.)
4. **HTTPS**: Use HTTPS in production to protect tokens in transit
5. **Password Requirements**: Add password strength validation (minimum length, complexity, etc.)
6. **Rate Limiting**: Implement rate limiting for signup/login endpoints to prevent brute force attacks
7. **Database**: Use PostgreSQL or MySQL instead of SQLite in production
8. **Token Expiration**: Adjust token expiration time as needed (default: 1 hour)
9. **Input Validation**: Consider using email validation libraries like `email-validator` for more robust validation
10. **Error Messages**: Production mode automatically hides detailed error messages

## Customization

### Change Token Expiration

In `deafauth/auth.py`, modify the `generate_token` function:

```python
token = generate_token(user.id, expires_in=7200)  # 2 hours
```

### Add More User Fields

In `deafauth/models.py`, extend the User model:

```python
class User(db.Model):
    # ... existing fields ...
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
```

### Add Email Sending

Install Flask-Mail and configure in `app.py`:

```python
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# ... other mail config ...

mail = Mail(app)

# In routes.py, send verification email
def send_verification_email(user):
    msg = Message('Verify Your Email',
                  recipients=[user.email])
    msg.body = f'Click to verify: http://yourapp.com/auth/verify/{user.verification_token}'
    mail.send(msg)
```

## Testing

Example test with curl:

```bash
# Signup
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Verify (use token from signup response)
curl http://localhost:5000/auth/verify/TOKEN_HERE

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Access protected route (use token from login response)
curl http://localhost:5000/auth/me \
  -H "Authorization: Bearer TOKEN_HERE"
```

## Production Deployment

### Using Gunicorn

```bash
# Install Gunicorn
pip install gunicorn

# Run with 4 worker processes
gunicorn -w 4 -b 0.0.0.0:8000 "app:create_app()"
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:create_app()"]
```

## License

This template is provided as-is for use in your projects. Modify as needed.

## Contributing

Feel free to submit issues or pull requests to improve this template.

## Version

**DeafAuth v0.1** - Initial release with basic authentication features.
