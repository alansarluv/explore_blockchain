const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
  "chain": [
    {
      "index": 1,
      "timeStamp": 1622346123369,
      "transactions": [
        
      ],
      "nonce": 911,
      "hash": "0",
      "previousBlockHash": "0"
    },
    {
      "index": 2,
      "timeStamp": 1622346138304,
      "transactions": [
        
      ],
      "nonce": 18140,
      "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
      "previousBlockHash": "0"
    },
    {
      "index": 3,
      "timeStamp": 1622346205631,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "ff5d9e80c0f811eba8edf3b127fabae9",
          "transactionId": "084cc250c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 100,
          "sender": "HGYFUTHGJKL6721NJK",
          "recipient": "PFTRVFULK45620349BLVJ31JHJK",
          "transactionId": "1a6553d0c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 6,
          "sender": "HGYFUTHGJKL6721NJK",
          "recipient": "PFTRVFULK45620349BLVJ31JHJK",
          "transactionId": "1efa9360c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 30,
          "sender": "JLA76NJKL21NJK",
          "recipient": "PFTRVFULK45620349BLVJ31JHJK",
          "transactionId": "28a00ee0c0f911eba8edf3b127fabae9"
        }
      ],
      "nonce": 13941,
      "hash": "000082a09751614ce4779914ecb258dba7d2e53265cf30ad2381029c54c9a2df",
      "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
      "index": 4,
      "timeStamp": 1622346283185,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "ff5d9e80c0f811eba8edf3b127fabae9",
          "transactionId": "3066b840c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 70,
          "sender": "VFULJLA76NJKL21NJK",
          "recipient": "PFTRVFULK45620349BLVJ31JHJK",
          "transactionId": "423d85d0c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 36,
          "sender": "6NJKL21NJKVFULJLA7",
          "recipient": "BLVJ31JHPFTRVFULK45620JK",
          "transactionId": "4f6f5c60c0f911eba8edf3b127fabae9"
        },
        {
          "amount": 93,
          "sender": "6NJKL21NJKVFULJLA7",
          "recipient": "BLVJ31JHPFTRVFULK45620JK",
          "transactionId": "57284a20c0f911eba8edf3b127fabae9"
        }
      ],
      "nonce": 1569,
      "hash": "000021e9693d4d86de58a893a1162710091602df70ca91eef42435ccb8adcd10",
      "previousBlockHash": "000082a09751614ce4779914ecb258dba7d2e53265cf30ad2381029c54c9a2df"
    },
    {
      "index": 5,
      "timeStamp": 1622346299352,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "ff5d9e80c0f811eba8edf3b127fabae9",
          "transactionId": "5ea05e50c0f911eba8edf3b127fabae9"
        }
      ],
      "nonce": 104683,
      "hash": "00001fe33977e30bf5d45685e9a96e23fd0e45a878f52696449b1c6e1358d3f4",
      "previousBlockHash": "000021e9693d4d86de58a893a1162710091602df70ca91eef42435ccb8adcd10"
    },
    {
      "index": 6,
      "timeStamp": 1622346308864,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "00",
          "recipient": "ff5d9e80c0f811eba8edf3b127fabae9",
          "transactionId": "6845d9d0c0f911eba8edf3b127fabae9"
        }
      ],
      "nonce": 213516,
      "hash": "0000271406743fcd16184728b133162ea67227f2163b2548bed64032073d68a6",
      "previousBlockHash": "00001fe33977e30bf5d45685e9a96e23fd0e45a878f52696449b1c6e1358d3f4"
    }
  ],
  "pendingTransaction": [
    {
      "amount": 12.5,
      "sender": "00",
      "recipient": "ff5d9e80c0f811eba8edf3b127fabae9",
      "transactionId": "6df032e0c0f911eba8edf3b127fabae9"
    }
  ],
  "currentNodeUrl": "http://localhost:3001",
  "networkNodes": [
    
  ]
};

console.log(bitcoin.chainIsValid(bc1.chain));

// bitcoin.createNewBlock(2389, '0INA90SDNF90N', '90ANSD9F0N900N');

// bitcoin.createNewTransaction(100, 'ALEXJUYTLK', 'JANEJIUY878HGJK');
// bitcoin.createNewBlock(1111, '0INHGSDNF90N', '90ANSNMBH0N');

// bitcoin.createNewTransaction(2121, 'ALEXJUYTLK1', 'JANEJIUY878HGJK1');
// bitcoin.createNewTransaction(2231, 'ALEXJUYTLK2', 'JANEJIUY878HGJK2');
// bitcoin.createNewTransaction(2412, 'ALEXJUYTLK3', 'JANEJIUY878HGJK3');
// bitcoin.createNewBlock(3212, 'JUGALAIHYU898JH', '987HJAA90ANSNMBH0N');


// const previousBlockHash = "JHGUYFTRDRT896VGHHGWK7231B";
// const currentBlockData = [
//   {
//     amount: 10,
//     sender: 'NAQPFYOW8910JKGIJ767VHJJK',
//     recipient: 'HJAOJIW782610JHBJBBKKVDFGDGL'
//   },
//   {
//     amount: 30,
//     sender: 'HAPWJNAQPFY212321KLLAJSKAJ67868K',
//     recipient: 'ZAPWNLKDWNCX782610JHBJBBKKVVAJHJSW'
//   },
//   {
//     amount: 200,
//     sender: 'CFGACOIJSOW761027HJKAKJ7KJGHJGS',
//     recipient: 'KJHAGSIOW1811JKHASUSAK987GHFDAGSJHK'
//   },
// ];

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, '251725'));

// console.log(bitcoin)