import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0xfb42B39f1cB3008E16E5d696C0B3688B1bBC55Bc'
);

export default campaignFactory;
