import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  //We are in the browser and metamask in running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are either on the server or the user isn't running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/b4e2b3bf723f4985ae36bc838089e50d'
  );

  web3 = new Web3(provider);
}

export default web3;
