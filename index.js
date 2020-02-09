const { BaseTransaction, utils } = require("@liskhq/lisk-transactions");
const { APIClient, transactions } = require('@liskhq/lisk-client');
const { getNetworkIdentifier } = require('@liskhq/lisk-cryptography');
var config = require('./config');
var async = require('async');
var sleep = require('sleep');
const LiskNode = new APIClient([config.server]);

class BetTransaction extends BaseTransaction {
  static get TYPE () {
    return 1001;
  }

  static get FEE () {
    return `${10 ** 7}`;
  };

  assetToBytes() {
    const { data } = this.asset;
    return data ? Buffer.from(data, 'utf8') : Buffer.alloc(0);
  }
}

function randomNumberFrom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createTransaction = (amount, betNumber, passphrase) => {
  let tx =  new BetTransaction({
    asset: {
      data: betNumber.toString(),
      amount: `${utils.convertLSKToBeddows(amount)}`,
      recipientId: "0L",
    },
    fee: `${utils.convertLSKToBeddows('0.1')}`,
    timestamp: getTimestamp(),
    networkIdentifier: getNetworkIdentifier(config.genesisPayloadHash,config.networkId)
  });
  tx.sign(passphrase);
  return tx;
};

const getTimestamp = () => {
  const millisSinceEpoc = Date.now() - config.startDate;
  const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
  return parseInt(inSeconds);
};

const broadcastTransaction = (transaction) => {
  return LiskNode.transactions.broadcast(transaction.toJSON());
};

function SubmitTransaction(i) {
  const amount = randomNumberFrom(1,5).toString();
  const bet = randomNumberFrom(2,98).toString();
  console.log('['+i+']Creating bet: '+bet+' with amount:'+bet);
	var transaction = createTransaction(amount,bet,config.senderAccount);
	var result = broadcastTransaction(transaction);
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
            SubmitTransaction(i);
          },
      ], function(err) {});
      sleep.msleep(config.intervalInMs);
    }
  }
}

startLoop();