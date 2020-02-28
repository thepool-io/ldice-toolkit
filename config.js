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

var config = {};

config.server = "http://ldice.thepool.io:4000";
config.genesisPayloadHash = "304b5c4b96ff6ff1230689c25db983a63a077b91cc881d18042d1f333ba65662";
config.networkId = "ldice";
config.senderAccount = "wagon stock borrow episode laundry kitten salute link globe zero feed marble";
config.startDate = Date.parse(new Date(Date.UTC(2020, 2, 11, 17, 0, 0, 0)).toISOString());

config.numberOfTransactions = 1;
config.numberOfChunks = 1500;
config.intervalInMs = 15;

module.exports = config;