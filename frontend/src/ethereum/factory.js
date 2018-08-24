import web3 from './web3';
import compiledCampaignFactory from './build/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  JSON.parse(compiledCampaignFactory.interface),
  '0x982E4c1B69Fd8356024654f978A1780bCa3d4E66'
);

export default campaignFactory;
