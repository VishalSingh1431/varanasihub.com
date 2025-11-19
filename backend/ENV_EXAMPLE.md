# .env File Example

## How your backend/.env file should look:

```env
PORT=5000

# Aiven PostgreSQL Connection String
# Format: postgres://username:password@host:port/database?sslmode=require
DATABASE_URL=postgres://avnadmin:AVNS_abc123XYZ@pg-12345678-yourproject.g.aivencloud.com:12345/defaultdb?sslmode=require

# JWT Secret (use a long random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters

# Google OAuth Client ID
GOOGLE_CLIENT_ID=615226246647-8eeg93jcdfivjqdh4rv5so4traivbv25.apps.googleusercontent.com
```

## Real Example Breakdown:

```
DATABASE_URL=postgres://avnadmin:AVNS_abc123XYZ@pg-12345678-yourproject.g.aivencloud.com:12345/defaultdb?sslmode=require
```

**Breaking it down:**
- `postgres://` - Protocol
- `avnadmin` - Username (usually "avnadmin" for Aiven)
- `AVNS_abc123XYZ` - Your password (starts with AVNS_ for Aiven)
- `pg-12345678-yourproject.g.aivencloud.com` - Hostname (from Aiven)
- `12345` - Port number (from Aiven, usually 4-5 digits)
- `defaultdb` - Database name (usually "defaultdb" for Aiven)
- `?sslmode=require` - SSL requirement

## How to Get Your Connection String:

1. Go to https://console.aiven.io/
2. Log in to your account
3. Select your **Project**
4. Click on your **PostgreSQL service**
5. Go to the **"Connection information"** tab
6. Look for **"Service URI"** or **"Connection string"**
7. Copy the entire string (it will look like the example above)
8. Paste it in your `backend/.env` file as `DATABASE_URL=...`

## Important Notes:

- ✅ The connection string should start with `postgres://` or `postgresql://`
- ✅ It should include your actual password (the part after the `:` and before the `@`)
- ✅ The hostname should end with `.aivencloud.com`
- ✅ Make sure there are NO spaces around the `=` sign
- ✅ Don't put quotes around the connection string

## Example of What NOT to Do:

❌ `DATABASE_URL = postgres://...` (spaces around =)
❌ `DATABASE_URL="postgres://..."` (quotes)
❌ `DATABASE_URL=postgres://avnadmin:@host...` (missing password)
❌ `DATABASE_URL=postgres://avnadmin:password@host` (missing port/database)

## After Setting Up:

1. Save the `.env` file
2. Restart your backend server: `npm run dev`
3. Check the terminal for connection status messages

