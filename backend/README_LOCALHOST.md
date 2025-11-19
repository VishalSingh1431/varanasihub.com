# Localhost Subdomain Setup

## How to Access Business Websites on Localhost

When running in development mode, business websites are accessible via subdomain URLs:

### Format
- **Subdomain URL**: `http://[business-slug].localhost:5000`
- **Subdirectory URL**: `http://localhost:5000/[business-slug]`

### Example
If you created a business with slug "guptamedical":
- Subdomain: `http://guptamedical.localhost:5000`
- Subdirectory: `http://localhost:5000/guptamedical`

## Browser Support

Most modern browsers (Chrome, Edge, Firefox) support `*.localhost` subdomains automatically. No configuration needed!

## Troubleshooting

If subdomains don't work:
1. Make sure you're using `http://` (not `https://`)
2. Make sure the port matches your backend server port (default: 5000)
3. Try accessing via subdirectory URL instead: `http://localhost:5000/[slug]`
4. Clear browser cache and try again

## Production

In production, subdomains will automatically use your configured domain:
- `https://[business-slug].varanasihub.com`

