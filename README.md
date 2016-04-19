# xAudio

Simple Node command line application that will download audio from a webpage.

Currently the only audio that is supported is audio embedded in an HTML `audio`
tag's `src` URL.

## Installation

## Usage

`xAudio -u <URLs>`

By default, xAudio will download files to your home directory.  You can also
specify the download destination using the `-d` option.

**Linux**

`xAudio -u <URLs> -d /some/file/location`

**Windows**

`xAudio -u <URLs> -d C:\\Users\\andrew\\Downloads`

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
