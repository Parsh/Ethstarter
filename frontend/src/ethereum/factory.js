import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0xd3459F8b8089e991Da314E7137991f2D316B848d'
);

export default campaignFactory;
