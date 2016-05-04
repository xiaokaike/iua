'use strict'

/**
 * simple leancloud server for upload
 * 
 */

var fs = require('fs')
var express = require('express')
var path = require('path')
var AV = require('leanengine')
var app = require('./index.js')

var APP_ID = process.env.LC_APP_ID
var APP_KEY = process.env.LC_APP_KEY
var MASTER_KEY = process.env.LC_APP_MASTER_KEY
var PORT = parseInt(process.env.LC_APP_PORT || 3009)

AV.initialize(APP_ID, APP_KEY, MASTER_KEY)


app.listen(PORT, function() {
  console.log('Node app is running, port:', PORT)
});
