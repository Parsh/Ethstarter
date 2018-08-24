import web3 from './web3';
import compiledCampaign from './build/Campaign.json';

export default contract_address => {
  return new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    contract_address
  );
};
