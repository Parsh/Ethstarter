const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaignFactory = require('../build/CampaignFactory.json');
const compiledCampaign = require('../build/Campaign.json');

describe('Campaign', () => {
  let accounts, factory, campaignAddress, campaign;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await web3.eth
      .Contract(JSON.parse(compiledCampaignFactory.interface))
      .deploy({
        data: compiledCampaignFactory.bytecode
      })
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await factory.methods.createCampaign('100').send({
      from: accounts[0],
      gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface),
      campaignAddress
    );
  });
});
