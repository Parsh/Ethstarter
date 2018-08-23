import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0xafd4B30f6e29Af75109794C589f46C417FBF4207'
);

export default campaignFactory;
