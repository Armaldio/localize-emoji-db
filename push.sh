#!/bin/bash

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b updates
  git add .
  git commit --message "Build $TRAVIS_BUILD_NUMBER - Automated JSON update"
}

upload_files() {
  git remote add publish https://${GH_TOKEN}@github.com/Armaldio/localize-emoji-db.git > /dev/null 2>&1
  git push --quiet --set-upstream publish updates
}

setup_git
commit_website_files
upload_files
