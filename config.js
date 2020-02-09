var config = {};

config.server = "http://127.0.0.1:4000";
config.genesisPayloadHash = "304b5c4b96ff6ff1230689c25db983a63a077b91cc881d18042d1f333ba65662";
config.networkId = "ldice";
config.senderAccount = "";
config.startDate = Date.parse(new Date(Date.UTC(2019, 4, 24, 17, 0, 0, 0)).toISOString());

config.numberOfTransactions = 25;
config.numberOfChunks = 25;
config.intervalInMs = 15;

module.exports = config;