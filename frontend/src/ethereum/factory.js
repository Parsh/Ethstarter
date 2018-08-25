import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0xC9e4474c011D6c674Df8547d9217CEA7e8F13C37'
);

export default campaignFactory;
