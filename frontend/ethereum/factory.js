import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0x39D9ef4edE8ec7A6F12Ca4bD9bD0e5a5c5487c36'
);

export default campaignFactory;
