const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, '0INA90SDNF90N', '90ANSD9F0N900N');

bitcoin.createNewTransaction(100, 'ALEXJUYTLK', 'JANEJIUY878HGJK');
bitcoin.createNewBlock(1111, '0INHGSDNF90N', '90ANSNMBH0N');

bitcoin.createNewTransaction(2121, 'ALEXJUYTLK1', 'JANEJIUY878HGJK1');
bitcoin.createNewTransaction(2231, 'ALEXJUYTLK2', 'JANEJIUY878HGJK2');
bitcoin.createNewTransaction(2412, 'ALEXJUYTLK3', 'JANEJIUY878HGJK3');
bitcoin.createNewBlock(3212, 'JUGALAIHYU898JH', '987HJAA90ANSNMBH0N');



console.log(bitcoin);

