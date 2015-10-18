#!/bin/bash

function copy {
  rm -rf dist
  cp -R app dist
}

function push {
  git subtree push --prefix dist origin gh-pages
}

$@
