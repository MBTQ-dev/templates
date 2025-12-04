"""
Authentication routes for DeafAuth.
"""
from flask import Blueprint, request, jsonify
from .models import db, User
from .auth import generate_token, generate_verification_token, token_required

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    Register a new user.
    
    Request body:
        {
            "email": "user@example.com",
            "password": "secure_password"
        }
    
    Returns:
        JSON response with user info and verification token
    """
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    email = data['email'].strip().lower()
    password = data['password']
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 409
    
    # Create new user
    user = User(email=email)
    user.set_password(password)
    user.verification_token = generate_verification_token()
    
    try:
        db.session.add(user)
        db.session.commit()
        
        # In a real application, send verification email here
        # For now, we return the token in the response
        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict(),
            'verification_token': user.verification_token,
            'note': 'In production, verification token would be sent via email'
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create user', 'details': str(e)}), 500


@auth_bp.route('/verify/<token>', methods=['GET', 'POST'])
def verify_email(token):
    """
    Verify user's email address.
    
    Args:
        token: Verification token from signup
    
    Returns:
        JSON response with verification status
    """
    user = User.query.filter_by(verification_token=token).first()
    
    if not user:
        return jsonify({'error': 'Invalid verification token'}), 404
    
    if user.is_verified:
        return jsonify({'message': 'Email already verified'}), 200
    
    # Mark user as verified
    user.is_verified = True
    user.verification_token = None
    
    try:
        db.session.commit()
        return jsonify({
            'message': 'Email verified successfully',
            'user': user.to_dict()
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to verify email', 'details': str(e)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate user and return JWT token.
    
    Request body:
        {
            "email": "user@example.com",
            "password": "secure_password"
        }
    
    Returns:
        JSON response with JWT token
    """
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400
    
    email = data['email'].strip().lower()
    password = data['password']
    
    # Find user
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Check if email is verified
    if not user.is_verified:
        return jsonify({'error': 'Email not verified. Please verify your email first.'}), 403
    
    # Generate JWT token
    token = generate_token(user.id)
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(user_id):
    """
    Get current authenticated user's information.
    
    Requires:
        Authorization header with Bearer token
    
    Returns:
        JSON response with user info
    """
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': user.to_dict()
    }), 200


@auth_bp.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    
    Returns:
        JSON response indicating service status
    """
    return jsonify({
        'status': 'healthy',
        'service': 'DeafAuth v0.1'
    }), 200
