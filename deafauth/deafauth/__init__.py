"""
DeafAuth Blueprint - Flask-based authentication module.

This module provides basic authentication functionality including:
- User signup
- Email verification
- User login
- Pasteo token handling
"""
from flask import Blueprint

# Import routes to register them with the blueprint
from .routes import auth_bp

__version__ = '0.1.0'
__all__ = ['auth_bp']
