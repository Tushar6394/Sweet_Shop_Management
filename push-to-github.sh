#!/bin/bash

# Script to push Sweet Shop Management System to GitHub
# Usage: ./push-to-github.sh <your-github-repo-url>

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your GitHub repository URL"
    echo ""
    echo "Usage: ./push-to-github.sh <your-github-repo-url>"
    echo ""
    echo "Example:"
    echo "  ./push-to-github.sh https://github.com/yourusername/sweet-shop-management.git"
    echo ""
    echo "Or with SSH:"
    echo "  ./push-to-github.sh git@github.com:yourusername/sweet-shop-management.git"
    exit 1
fi

REPO_URL=$1

echo "🚀 Setting up GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

echo "📤 Pushing to GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Visit your repository at: $REPO_URL"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo "Please check:"
    echo "  1. Repository URL is correct"
    echo "  2. You have push access to the repository"
    echo "  3. You're authenticated with GitHub (git credential helper)"
    exit 1
fi

