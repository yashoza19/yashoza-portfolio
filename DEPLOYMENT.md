# Deployment Guide

This portfolio is configured for automatic deployment to Vercel via GitHub Actions.

## Prerequisites

- GitHub repository connected to Vercel
- Vercel account (free tier is sufficient)
- Web3Forms API key

## Initial Vercel Setup

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import the `yashoza-portfolio` repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy" (initial deployment)

### 2. Get Vercel Project IDs

After the initial deployment, you need three values from Vercel:

1. **Vercel Token**:
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Click "Create Token"
   - Name it "GitHub Actions Deployment"
   - Copy the token (you won't see it again)

2. **Organization ID**:
   - Go to your Vercel dashboard
   - Settings → General
   - Copy the "Organization ID"

3. **Project ID**:
   - Open your project in Vercel
   - Settings → General
   - Copy the "Project ID"

### 3. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions:

Add these **Repository secrets**:

| Secret Name | Value | Where to Find It |
|-------------|-------|------------------|
| `VERCEL_TOKEN` | Your Vercel token | Created in step 2.1 |
| `VERCEL_ORG_ID` | Your organization ID | Found in step 2.2 |
| `VERCEL_PROJECT_ID` | Your project ID | Found in step 2.3 |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Your Web3Forms access key | From [web3forms.com](https://web3forms.com) |

### 4. Add Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables:

Add:
- **Name**: `NEXT_PUBLIC_WEB3FORMS_KEY`
- **Value**: Your Web3Forms access key
- **Environments**: Production, Preview, Development

## How Deployment Works

### Automatic Deployment Triggers

1. **Production Deployment** (Push to `main`):
   - Triggered when code is pushed to the `main` branch
   - Runs build and deploys to production URL
   - Live at: `https://yashoza-portfolio.vercel.app`

2. **Preview Deployment** (Pull Requests):
   - Triggered when a PR is opened or updated
   - Creates a unique preview URL for testing
   - Does NOT affect production

### Manual Deployment (CLI)

If you need to deploy manually:

```bash
# Install Vercel CLI (already done)
pnpm add -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## GitHub Action Workflow

The workflow file is located at `.github/workflows/vercel-deploy.yml`:

- **Runs on**: Every push to `main` and every PR
- **Steps**:
  1. Checkout code
  2. Install pnpm and dependencies
  3. Run `pnpm build` (ensures build passes)
  4. Deploy to Vercel (production or preview)

## Monitoring Deployments

### View Deployment Status

1. **GitHub Actions Tab**:
   - Go to your repository → Actions
   - See all deployment runs and their status

2. **Vercel Dashboard**:
   - [vercel.com/dashboard](https://vercel.com/dashboard)
   - See all deployments, analytics, logs

### Deployment URLs

- **Production**: `https://yashoza-portfolio.vercel.app`
- **Preview**: Unique URL for each PR (shown in PR comments)

## Analytics & Monitoring

After deployment, you can access:

- **Vercel Analytics**: [vercel.com/analytics](https://vercel.com/analytics)
  - Page views, visitor stats
  - Custom events (contact form submissions, project clicks, etc.)

- **Speed Insights**: [vercel.com/speed-insights](https://vercel.com/speed-insights)
  - Core Web Vitals
  - Performance metrics

## Troubleshooting

### Build Fails

Check the GitHub Actions logs:
1. Go to repository → Actions
2. Click the failed workflow run
3. Expand the "Build project" step
4. Fix errors and push again

### Environment Variables Not Working

1. Verify the variable name matches exactly: `NEXT_PUBLIC_WEB3FORMS_KEY`
2. Check that it's added in both:
   - Vercel dashboard (for Vercel deployments)
   - GitHub Secrets (for GitHub Actions builds)
3. Redeploy after adding environment variables

### Contact Form Not Sending Emails

1. Verify Web3Forms key is correct
2. Check that the environment variable is set in Vercel
3. Test the form after a fresh deployment
4. Check Web3Forms dashboard for submission logs

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning (automatic)

## CI/CD Pipeline Summary

```
┌─────────────────┐
│  Push to main   │
│   or open PR    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│  Workflow runs  │
└────────┬────────┘
         │
         ├──► Install dependencies (pnpm)
         ├──► Build project (pnpm build)
         └──► Deploy to Vercel
                │
                ├──► Production (if main branch)
                └──► Preview (if PR)
```

## Local Testing Before Deployment

Always test locally before merging to main:

```bash
# Build production bundle
pnpm build

# Preview production build
pnpm start

# Visit http://localhost:3000
```

## Notes

- First deployment might take 2-3 minutes
- Subsequent deployments are faster (build cache)
- Preview deployments are deleted after PR is merged
- Production deployments are kept forever
- Analytics data starts accumulating immediately after first deployment
