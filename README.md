# xAudio

[![NPM](https://nodei.co/npm/xAudio.png)](https://nodei.co/npm/xAudio/)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Description

Simple Node command line application that will download audio from a webpage.

Currently the only audio that is supported HTML `audio` tags.

eg. 

```html
<audio src="audio.mp3" preload="true" autoplay="true"></audio>
```

## Installation

`$ npm install -g xAudio`

## Usage

`$ xAudio -u <URLs>`

By default, xAudio will download files to your home directory.  You can also
specify the download destination using the `-d` option.

**Linux**

`$ xAudio -u <URLs> -d /some/file/location`

**Windows**

`$ xAudio -u <URLs> -d C:\\Users\\andrew\\Downloads`

## Help

`$ xAudio -h`


