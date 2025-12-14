# GitHub Setup Instructions

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `sweet-shop-management` (or any name you prefer)
5. Choose **Public** (as required by the assignment)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/tusharmacbookair/sweet-shop-management

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sweet-shop-management.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/sweet-shop-management.git

# Push all commits to GitHub
git push -u origin master
```

## Step 3: Verify

Visit your repository on GitHub to confirm all files and commits are there.

## Alternative: If you already have a repository URL

If you've already created the repository, just run:

```bash
cd /Users/tusharmacbookair/sweet-shop-management
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin master
```

