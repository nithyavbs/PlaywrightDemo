# Tax Login Page Test Scenarios

Generated: 2026-04-02

## 1. Successful login
- ID: LOGIN-001
- Title: Login with valid username and password
- Preconditions: User account exists with active status.
- Steps:
  1. Navigate to login page.
  2. Enter valid username (e.g. user@example.com).
  3. Enter valid password.
  4. Click "Login".
- Expected result: User is authenticated and redirected to dashboard/home page; session cookie created.

## 2. Invalid password
- ID: LOGIN-002
- Title: Login attempt with valid username and wrong password
- Preconditions: User account exists.
- Steps:
  1. Navigate to login page.
  2. Enter valid username.
  3. Enter incorrect password.
  4. Click "Login".
- Expected result: Login fails; error message appears (e.g. "Incorrect username or password"); no session cookie.

## 3. Nonexistent username
- ID: LOGIN-003
- Title: Login attempt with unknown username
- Preconditions: No account matches username.
- Steps:
  1. Navigate to login page.
  2. Enter unregistered username.
  3. Enter any password.
  4. Click "Login".
- Expected result: Generic login failure message; no account enumeration.

## 4. Empty required fields
- ID: LOGIN-004
- Title: Submit form with empty username and password
- Preconditions: None.
- Steps:
  1. Navigate to login page.
  2. Leave username empty.
  3. Leave password empty.
  4. Click "Login".
- Expected result: Client-side validation prevents submission; both field errors shown.

## 5. Whitespace-only fields
- ID: LOGIN-005
- Title: Submit username/password as spaces only
- Preconditions: None.
- Steps:
  1. Navigate to login page.
  2. Enter "   " for username.
  3. Enter "   " for password.
  4. Click "Login".
- Expected result: Input is trimmed and rejected; validation message displayed.

## 6. Username format validation
- ID: LOGIN-006
- Title: Invalid email format in username (if email required)
- Preconditions: username field expects email format.
- Steps:
  1. Navigate to login page.
  2. Enter "user@@example".
  3. Enter valid password.
  4. Click "Login".
- Expected result: Validation error for format; login blocked.

## 7. Password minimum length violation
- ID: LOGIN-007
- Title: Password shorter than minimum length
- Preconditions: password requires > 8 chars.
- Steps:
  1. Navigate to login page.
  2. Enter valid username.
  3. Enter "Ab1!".
  4. Click "Login".
- Expected result: Validation message appears for minimum length.

## 8. Maximum field length
- ID: LOGIN-008
- Title: Overlong username/password values
- Preconditions: App has max length constraints (e.g., 256 chars username, 128 chars password)
- Steps:
  1. Navigate to login page.
  2. Input 500-char username and 256-char password.
  3. Click "Login".
- Expected result: Fields are truncated or blocked; server rejects with 400 if reached.

## 9. SQL injection attempt
- ID: LOGIN-009
- Title: Login fields with SQL payloads
- Preconditions: None.
- Steps:
  1. Navigate to login page.
  2. Username: "' OR '1'='1".
  3. Password: "anything".
  4. Click "Login".
- Expected result: Injection not allowed; generic authentication failure.

## 10. XSS payload in username/password
- ID: LOGIN-010
- Title: HTML/script content in login fields
- Preconditions: None.
- Steps:
  1. Navigate to login page.
  2. Username: "<script>alert(1)</script>".
  3. Password: "<img src=x onerror=alert(1)>".
  4. Click "Login".
- Expected result: Input sanitized/escaped; no script execution; login fails.

## 11. Rate limiting / lockout
- ID: LOGIN-011
- Title: Repeated failed login triggers lockout
- Preconditions: Throttling configured (e.g., 5 attempts in 5 minutes).
- Steps:
  1. Attempt login with valid username and invalid password 6 times.
  2. On 6th attempt, note response.
- Expected result: Account or IP temporarily blocked; message shows retry cooldown.

## 12. Locked account behavior
- ID: LOGIN-012
- Title: Locked account cannot log in
- Preconditions: Account is locked (manual / previous behavior).
- Steps:
  1. Navigate to login page.
  2. Enter locked account credentials.
  3. Click "Login".
- Expected result: Specific locked-account message; no access.

## 13. Password expiry flow
- ID: LOGIN-013
- Title: Expired password prompt on login
- Preconditions: Account password is expired.
- Steps:
  1. Navigate to login page.
  2. Enter credentials.
  3. Click "Login".
- Expected result: Redirect to password change flow with informative message.

## 14. Remember me flow
- ID: LOGIN-014
- Title: "Remember me" persists session
- Preconditions: Option present.
- Steps:
  1. Login with remember me checked.
  2. Close and reopen browser.
  3. Return to app.
- Expected result: User remains authenticated until expected timeout.

## 15. Forgot password link
- ID: LOGIN-015
- Title: Forgot password navigates correctly
- Preconditions: Link displayed.
- Steps:
  1. Click "Forgot password".
  2. Verify redirection to reset flow.
- Expected result: Reset page opens and enforces identity verification.

## 16. Accessibility and keyboard interaction
- ID: LOGIN-016
- Title: Submit with Enter key and focus states
- Preconditions: Keyboard navigation supported.
- Steps:
  1. Tab to username/password.
  2. Enter credentials.
  3. Press Enter.
- Expected result: Form submitted; focus outlines visible to keyboard users.

## 17. Network failure during login
- ID: LOGIN-017
- Title: Show meaningful error on network failure
- Preconditions: Simulate offline or server timeout.
- Steps:
  1. Trigger login while network is disabled.
- Expected result: Error displayed ("Network error, try again").

## 18. HTTP security headers and HTTPS enforcement (verification)
- ID: LOGIN-018
- Title: Login page requires HTTPS and sets secure headers
- Preconditions: Test against live environment.
- Steps:
  1. Request login page via HTTP.
  2. Check response headers via devtools or test script.
- Expected result: HTTP redirects to HTTPS; headers include HSTS, CSP, X-Frame-Options, etc.

## 19. CSRF token presence and validation
- ID: LOGIN-019
- Title: Form includes CSRF token and rejects missing token
- Preconditions: CSRF protection enabled.
- Steps:
  1. Inspect login form token.
  2. Submit form with token removed/invalid.
- Expected result: Request rejected; error for invalid CSRF.

## 20. Security auditing of every failed login
- ID: LOGIN-020
- Title: Failed authentications are auditable
- Preconditions: Logging/auditing system in place.
- Steps:
  1. Cause a failed login.
  2. Check logs/traces.
- Expected result: Entry created with anonymized identifier and reason.
