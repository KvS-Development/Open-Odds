# Supabase Authentication Setup Guide

## Problem: Email Links Redirect to localhost:3000

If your Supabase authentication emails are redirecting to `localhost:3000` instead of your production URL, follow these steps:

## 1. Update Supabase Email Templates

Go to your [Supabase Dashboard](https://supabase.com/dashboard) and:

1. Select your project
2. Go to **Authentication** → **Email Templates**
3. Update the **Confirm signup** template:
   - Find the line with `{{ .ConfirmationURL }}`
   - Change it to: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`

4. Update the **Magic Link** template (if using):
   - Find the line with `{{ .ConfirmationURL }}`
   - Change it to: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink`

## 2. Configure Redirect URLs in Supabase

In your Supabase Dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Add these URLs to **Redirect URLs** (one per line):
   ```
   http://localhost:3000/**
   https://open-odds.vercel.app/**
   https://open-odds.com/**
   https://*.vercel.app/**
   ```

3. Set **Site URL** to your production URL:
   ```
   https://open-odds.vercel.app
   ```
   (or `https://open-odds.com` if you have a custom domain)

## 3. Environment Variables

### For Local Development (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Production (Vercel Dashboard)
Add these environment variables in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=https://open-odds.vercel.app
```

Or if you have a custom domain:
```env
NEXT_PUBLIC_APP_URL=https://open-odds.com
```

## 4. How It Works

The app uses this priority for determining the base URL:

1. `NEXT_PUBLIC_APP_URL` (if set explicitly)
2. `VERCEL_URL` (automatically set by Vercel)
3. `http://localhost:3000` (fallback for local development)

## 5. Testing

After making these changes:

1. **Test locally**: Sign up should redirect to `localhost:3000`
2. **Test on Vercel**: Sign up should redirect to your Vercel URL
3. **Check email**: The confirmation link should use the correct domain

## Troubleshooting

### Still redirecting to localhost?
- Clear your browser cache
- Check Supabase email templates again
- Verify the Site URL in Supabase settings
- Redeploy your Vercel app after adding environment variables

### Email not arriving?
- Check spam folder
- Verify SMTP settings in Supabase (for custom SMTP)
- Check Supabase auth logs for errors

### "Invalid token" errors?
- Make sure the redirect URLs in Supabase match exactly
- Include the wildcard pattern for Vercel preview deployments