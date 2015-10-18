#!/bin/bash

function copy {
  mkdir live
  cp -R app dist
}

function push {
  git subtree push --prefix dist origin gh-pages
}

$@
