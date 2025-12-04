# Task: Replace JWT with Paseto Across Codebase

## About Paseto
[Paseto (Platform-Agnostic Security Tokens)](https://paseto.io/) is a secure alternative to JWT (JSON Web Tokens) that provides better security guarantees and simpler implementation. Unlike JWT, Paseto is designed to prevent common cryptographic pitfalls and misuse.

## Objective
Replace all occurrences of 'JWT' with 'Paseto' throughout the entire codebase. This is a terminology update that prepares the codebase for potential migration to the Paseto token standard, while maintaining compatibility with existing JWT-based implementations during the transition.

## Scope
This replacement task applies to:

### 1. **Source Code Files**
- Python files (`.py`)
- JavaScript/TypeScript files (`.js`, `.ts`)
- Configuration files
- All other programming language files

### 2. **Documentation**
- README.md files
- API documentation
- User guides
- Technical specifications
- Inline code comments and docstrings

### 3. **Configuration and Data Files**
- Environment variable names
- Configuration files (`.env`, `.yaml`, `.json`, etc.)
- Database schemas or migrations (if applicable)

### 4. **Comments and String Literals**
- Function and class docstrings
- Inline comments
- String literals in user-facing messages
- Variable names and function names containing 'JWT'

## Replacement Rules

### Case Variations
Handle all case variations consistently:
- `JWT` → `Paseto`
- `jwt` → `paseto`
- `Jwt` → `Paseto`
- `JWT-` or `JWT_` → `Paseto-` or `Paseto_`

### Exceptions
**Do NOT replace** JWT in the following contexts:
- Third-party library names (e.g., `PyJWT` package name in `requirements.txt`)
- External API references that specifically use JWT
- Historical references in changelogs or version history
- URLs or external links that contain JWT

### Implementation Note
When replacing in code that uses JWT libraries:
```python
# Before
import jwt
token = jwt.encode(payload, secret)

# After
import jwt as paseto  # Library stays as jwt (PyJWT)
token = paseto.encode(payload, secret)
```

## Testing Requirements

After making replacements, verify that:

1. **Functionality is preserved**
   - All authentication flows still work
   - Token generation and validation remain functional
   - No breaking changes to API contracts

2. **Build and Tests Pass**
   - Run all existing unit tests
   - Run integration tests if available
   - Verify lint/style checks pass

3. **Documentation Accuracy**
   - Ensure all documentation correctly reflects the new terminology
   - Verify code examples in documentation are updated
   - Check that API documentation is consistent

4. **Compatibility**
   - Confirm the underlying token library functionality is unchanged (PyJWT library continues to work)
   - Verify that external integrations are not broken
   - Test with existing clients/consumers if applicable

## Validation Checklist

- [ ] All source files reviewed for JWT occurrences
- [ ] Documentation files updated with Paseto terminology
- [ ] Configuration files reviewed and updated
- [ ] Comments and docstrings updated
- [ ] Variable and function names refactored
- [ ] All tests pass successfully
- [ ] No regressions in functionality
- [ ] Code review completed
- [ ] Documentation reviewed for accuracy

## Notes

- This terminology change prepares the codebase for potential migration to the Paseto token standard
- The underlying token technology (PyJWT library) remains the same during this phase
- Focus on user-facing terminology and internal code references
- Maintain backwards compatibility where possible
- Update error messages and logging statements to use new terminology
- For more information about Paseto, visit: https://paseto.io/

## Review Guidelines

When reviewing this change:
1. Verify completeness - check for any missed JWT references
2. Confirm consistency - all references use the same case/format
3. Test thoroughly - ensure no functionality is broken
4. Check documentation - ensure it's clear and accurate
