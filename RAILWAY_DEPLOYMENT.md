# Railway Deployment Guide

## Prerequisites

1. Railway account: https://railway.app
2. GitHub repository connected to Railway
3. PostgreSQL database (Neon recommended)

## Environment Variables

Set these in Railway's environment dashboard:

```
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-production-domain.com
SECRET_KEY=<generate-a-strong-secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### Generating a Strong Secret Key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment Steps

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Railway project**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "GitHub Repo"
   - Choose the Sumi repository

3. **Add PostgreSQL Plugin**
   - In Railway, click "+ Add"
   - Select "Database"
   - Choose PostgreSQL
   - Railway will auto-populate `DATABASE_URL`

4. **Set Environment Variables**
   - Go to project settings
   - Add all env variables from the Prerequisites section

5. **Deploy**
   - Railway auto-deploys on git push to main/dev branch
   - Monitor build logs in the dashboard

## Build Output

- API builds to: `apps/api/dist/`
- Web builds to: `apps/web/dist/`
- Start command: `pnpm --filter @sumi/api start`

## Troubleshooting

### Build Fails

1. Check build logs in Railway dashboard
2. Verify all dependencies are installed: `pnpm install`
3. Verify TypeScript compiles: `pnpm build`
4. Check Node.js version (requires 22+)

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Ensure PostgreSQL allows SSL connections
3. Check network/firewall rules

### Port Issues

- Railway assigns a dynamic `PORT` environment variable
- API listens on this port automatically
- Don't hardcode port 3001 in production

## Next Steps

1. Test locally: `pnpm dev`
2. Test build: `pnpm build`
3. Push to GitHub
4. Monitor Railway deployment dashboard
