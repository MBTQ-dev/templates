"""
DeafAuth Flask Application
A lightweight authentication system template.

This is the main application entry point that sets up the Flask app,
database, and authentication routes.
"""
import os
from flask import Flask, jsonify
from deafauth.models import db
from deafauth.routes import auth_bp


def create_app(config=None):
    """
    Application factory for creating Flask app instances.
    
    Args:
        config: Optional dictionary of configuration overrides
    
    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__)
    
    # Default configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL',
        'sqlite:///deafauth.db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Override with custom config if provided
    if config:
        app.config.update(config)
    
    # Initialize database
    db.init_app(app)
    
    # Register authentication blueprint
    app.register_blueprint(auth_bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'service': 'DeafAuth',
            'version': '0.1.0',
            'description': 'Lightweight Flask-based authentication system',
            'endpoints': {
                'signup': '/auth/signup (POST)',
                'login': '/auth/login (POST)',
                'verify': '/auth/verify/<token> (GET/POST)',
                'me': '/auth/me (GET, requires token)',
                'health': '/auth/health (GET)'
            }
        })
    
    return app


if __name__ == '__main__':
    """
    Run the application in development mode.
    
    For production, use a WSGI server like Gunicorn:
        gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()
    """
    app = create_app()
    
    # Get port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run with debug mode (disable in production)
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.environ.get('FLASK_ENV') == 'development'
    )
