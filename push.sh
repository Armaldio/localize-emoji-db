#!/bin/bash

setup_git() {
  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.name "github-actions[bot]"
}

commit_website_files() {
  git add dist
  git commit --message "Automated JSON update"
}

upload_files() {
  git remote add publish https://${GH_TOKEN}@github.com/Armaldio/localize-emoji-db.git > /dev/null 2>&1
  git pull publish updates
  git push --quiet publish updates
}

setup_git
commit_website_files
upload_files
