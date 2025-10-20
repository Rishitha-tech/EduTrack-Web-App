#!/bin/bash
set -e

echo "========================================="
echo "STEP 1: Cleaning Git rebase state"
echo "========================================="
cd /home/runner/workspace

# Abort any rebase
git rebase --abort 2>/dev/null || echo "No active rebase to abort"

# Remove rebase directories
rm -rf .git/rebase-apply .git/rebase-merge 2>/dev/null || true

# If still stuck, completely reset Git (keeps files)
if git status 2>&1 | grep -q "rebase"; then
    echo "Git still stuck - doing full reset..."
    rm -rf .git
    git init
fi

echo "========================================="
echo "STEP 2: Initialize fresh Git repo"
echo "========================================="
git init 2>/dev/null || true
git checkout -B main
git config user.email "rishitha@edutrack.dev"
git config user.name "Rishitha-tech"

echo "========================================="
echo "STEP 3: Stage and commit all files"
echo "========================================="
git add -A
git commit -m "Initial clean push from Replit" 2>/dev/null || echo "Already committed or no changes"

echo "========================================="
echo "STEP 4: Set GitHub remote"
echo "========================================="
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Rishitha-tech/EduTrack-Web-App.git
git remote -v

echo "========================================="
echo "STEP 5: Push to GitHub"
echo "========================================="
git push -u origin main 2>/dev/null || git push -f origin main

echo "========================================="
echo "FINAL OUTPUT"
echo "========================================="
echo ""
echo "✅ GITHUB REPOSITORY URL:"
echo "https://github.com/Rishitha-tech/EduTrack-Web-App"
echo ""
echo "✅ LATEST COMMIT:"
git log -1 --oneline
echo ""
echo "✅ COMMIT HASH:"
git rev-parse HEAD
echo ""
echo "✅ README.MD STATUS:"
ls -lh README.md
echo ""
echo "✅ BRANCH & REMOTE:"
echo "Current branch: $(git branch --show-current)"
echo "Remote origin: $(git remote get-url origin)"
echo ""
echo "========================================="
echo "SUCCESS! Your workspace is synced to GitHub"
echo "========================================="
