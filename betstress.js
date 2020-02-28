/*
MIT License

Copyright (c) 2020 thepool.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var async = require('async');
var sleep = require('sleep');
var config = require('./config');
var utils = require('./utils');
const { APIClient } = require('@liskhq/lisk-client');
const LiskNode = new APIClient([config.server]);

function SubmitRandomBet(i,node) {
  const amount = utils.randomNumberFrom(1,5).toString();
  const bet = utils.randomNumberFrom(2,98).toString();
  console.log('['+i+']Creating bet: '+bet+' with amount:'+bet);
  var transaction = utils.createBetTransaction(amount,bet,config.senderAccount);
  var result = utils.broadcastTransaction(transaction,node);
  result.then(function(value) {
    console.log('['+i+']'+JSON.stringify(value.data));
    if (i==config.numberOfTransactions-1) {startLoop();}
  }).catch((error) => {
    console.log('['+i+']Promise error: '+error+' Raw-> '+JSON.stringify(error));
    if (i==config.numberOfTransactions-1) {startLoop();}
  });
}

function startLoop() {
  console.log("Chunk:"+config.numberOfChunks);
  config.numberOfChunks--;
  if (config.numberOfChunks >= 0) {
    for (var i = config.numberOfTransactions - 1; i >= 0; i--) {
      async.parallel([
          function(callback) {
            SubmitRandomBet(i,LiskNode);
          },
      ], function(err) {});
      sleep.msleep(config.intervalInMs);
    }
  }
}

startLoop();