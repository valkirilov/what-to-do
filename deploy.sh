#!/bin/bash

function copy {
  cp -R app/* dist/
}

function push {
  git subtree push --prefix dist origin gh-pages
}

$@
