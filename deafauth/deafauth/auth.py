"""
Pasteo (PASETO) token handling for authentication.
"""
import pyseto
from pyseto import Key
import secrets
import json
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app


def _get_key():
    """Get or create the PASETO key from the app config."""
    secret = current_app.config['SECRET_KEY'].encode('utf-8')
    # Ensure secret is 32 bytes for v4.local
    if len(secret) < 32:
        secret = secret.ljust(32, b'\0')
    elif len(secret) > 32:
        secret = secret[:32]
    return Key.new(version=4, purpose="local", key=secret)


def generate_token(user_id, expires_in=3600):
    """
    Generate a PASETO token for a user.
    
    Args:
        user_id: User's ID
        expires_in: Token expiration time in seconds (default: 1 hour)
    
    Returns:
        PASETO token string
    """
    payload = {
        'user_id': user_id,
        'exp': (datetime.utcnow() + timedelta(seconds=expires_in)).isoformat(),
        'iat': datetime.utcnow().isoformat()
    }
    
    key = _get_key()
    token = pyseto.encode(key, json.dumps(payload).encode('utf-8'))
    
    return token.decode('utf-8')


def decode_token(token):
    """
    Decode and verify a PASETO token.
    
    Args:
        token: PASETO token string
    
    Returns:
        Decoded payload or None if invalid
    """
    try:
        key = _get_key()
        decoded = pyseto.decode(key, token.encode('utf-8'))
        payload = json.loads(decoded.payload.decode('utf-8'))
        
        # Check expiration
        if 'exp' in payload:
            exp_time = datetime.fromisoformat(payload['exp'])
            if datetime.utcnow() > exp_time:
                return None
        
        return payload
    except (pyseto.DecryptError, pyseto.VerifyError, ValueError, KeyError):
        return None
    except Exception:
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
