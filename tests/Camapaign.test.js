const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCampaignFactory = require('../build/CampaignFactory.json');
const compiledCampaign = require('../build/Campaign.json');

describe('Campaign', () => {
  let accounts, factory, campaignAddress, campaign;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(
      JSON.parse(compiledCampaignFactory.interface)
    )
      .deploy({
        data: '0x' + compiledCampaignFactory.bytecode
      })
      .send({
        from: accounts[0],
        gas: '2000000'
      });

    await factory.methods.createCampaign('100', 'Test Campaign').send({
      from: accounts[0],
      gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface),
      campaignAddress
    );
  });

  it('should deploy a Campaign factory and a Campaign', () => {
    expect(factory.options.address).toBeDefined();
    expect(campaign.options.address).toBeDefined();
  });

  it('should mark the caller of the createCampaign method as a campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    expect(manager).toEqual(accounts[0]);
  });

  it('should allow people to contribute money and mark them as backers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });

    const isBacker = await campaign.methods.backers(accounts[1]).call();
    expect(isBacker).toBe(true);
  });

  it('should require a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '90'
      });
      fail();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should allow a manager to make a payment request', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '1900'
    });

    await campaign.methods
      .createRequest('Buy Fuel Tanks', '1000', accounts[2])
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    const request = await campaign.methods.requests(0).call();

    expect(request.description).toEqual('Buy Fuel Tanks');
    expect(request.value).toEqual('1000');
    expect(request.recipient).toEqual(accounts[2]);
  });

  it('should process the request and pay the recipient', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest(
        'Buy consoles',
        web3.utils.toWei('5', 'ether'),
        accounts[3]
      )
      .send({
        from: accounts[0],
        gas: '1000000'
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000'
    });

    let initialRecipientBalance = await web3.eth.getBalance(accounts[3]);
    initialRecipientBalance = parseFloat(
      web3.utils.fromWei(initialRecipientBalance, 'ether')
    );

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let finalRecipientBalance = await web3.eth.getBalance(accounts[3]);
    finalRecipientBalance = parseFloat(
      web3.utils.fromWei(finalRecipientBalance, 'ether')
    );

    expect(finalRecipientBalance - initialRecipientBalance).toEqual(5);
  });
});
