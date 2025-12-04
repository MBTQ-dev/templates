"""
Pasteo token handling for authentication.
"""
import jwt as pasteo
import secrets
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app


def generate_token(user_id, expires_in=3600):
    """
    Generate a Pasteo token for a user.
    
    Args:
        user_id: User's ID
        expires_in: Token expiration time in seconds (default: 1 hour)
    
    Returns:
        Pasteo token string
    """
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(seconds=expires_in),
        'iat': datetime.utcnow()
    }
    
    token = pasteo.encode(
        payload,
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    
    return token


def decode_token(token):
    """
    Decode and verify a Pasteo token.
    
    Args:
        token: Pasteo token string
    
    Returns:
        Decoded payload or None if invalid
    """
    try:
        payload = pasteo.decode(
            token,
            current_app.config['SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload
    except pasteo.ExpiredSignatureError:
        return None
    except pasteo.InvalidTokenError:
        return None


def generate_verification_token():
    """
    Generate a random token for email verification.
    
    Returns:
        Random URL-safe token string
    """
    return secrets.token_urlsafe(32)


def token_required(f):
    """
    Decorator to protect routes that require authentication.
    
    Usage:
        @app.route('/protected')
        @token_required
        def protected_route(current_user):
            return jsonify({'message': 'Access granted'})
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(' ')[1]  # Extract token from "Bearer <token>"
            except IndexError:
                return jsonify({'error': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        # Decode and verify token
        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Token is invalid or expired'}), 401
        
        # Pass user_id to the decorated function
        return f(payload['user_id'], *args, **kwargs)
    
    return decorated
