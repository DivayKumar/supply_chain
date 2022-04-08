'use strict';
 
var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
app.use(bodyParser.json());
 
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
 
app.get('/api/QueryAllProducts', async function (req, res) {
try {
// load the network configuration
const ccpPath = path.resolve(__dirname, '..', 'dev','fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
 
// Create a new file system based wallet for managing identities.
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = await Wallets.newFileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);
 
// Check to see if we've already enrolled the user.
const identity = await wallet.get('appUser');
if (!identity) {
console.log('An identity for the user "appUser" does not exist in the wallet');
console.log('Run the registerUser.js application before retrying');
return;
}
 
// Create a new gateway for connecting to our peer node.
const gateway = new Gateway();
await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
 
// Get the network (channel) our contract is deployed to.
const network = await gateway.getNetwork('testchannel');
 
// Get the contract from the network.
const contract = network.getContract('supply_chain');
 
// Evaluate the specified transaction
// QueryAllProducts transaction - requires no arguments
const result = await contract.evaluateTransaction('QueryAllProducts');
console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
res.status(200).json({response: result.toString()});
 
// Disconnect from the gateway.
await gateway.disconnect();
 
} catch (error) {
console.error(`Failed to evaluate transaction: ${error}`);
process.exit(1);
}
});
 

app.post('/api/addproduct/', async function (req, res) {
    try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..','dev', 'fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
     
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
     
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
    console.log('An identity for the user "appUser" does not exist in the wallet');
    console.log('Run the registerUser.js application before retrying');
    return;
    }
     
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
     
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('testchannel');
     
    // Get the contract from the network.
    const contract = network.getContract('supply_chain');
     
    // submit the specified transaction
    // AddProperty transaction - requires 5 argument, ex: (‘AddProperty’, '2', 'property2', '4000', 'Marry', '7890')
    await contract.submitTransaction('AddProduct',req.body.id,req.body.productName,req.body.area,req.body.owner, req.body.value);
    console.log('Transaction has been submitted');
    res.send('Transaction has been submitted');
     
    // Disconnect from the gateway.
    await gateway.disconnect();
     
    } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    process.exit(1);
    }
    });


    app.get('/api/QueryProductById/:id', async function (req, res) {
        try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'dev','fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
         
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
         
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
        }
         
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
         
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('testchannel');
         
        // Get the contract from the network.
        const contract = network.getContract('supply_chain');
         
        // Evaluate the specified transaction
        // QueryProductById transaction - requires one argument ex: ('QueryProductById', '2')
         
        const result = await contract.evaluateTransaction('QueryProductById',req.params.id);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
         
        // Disconnect from the gateway.
        await gateway.disconnect();
         
        } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
        }
        });

 
            
            app.put('/api/TransferProduct/:id', async function (req, res) {
            try {
            // load the network configuration
            const ccpPath = path.resolve(__dirname, '..', 'dev','fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
             
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
             
            // Check to see if we've already enrolled the user.
            const identity = await wallet.get('appUser');
            if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
            }
             
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
             
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('testchannel');
             
            // Get the contract from the network.
            const contract = network.getContract('supply_chain');
             
            // Submit the specified transaction
            // TransferProduct transaction - requires one argument ex: ('TransferProduct', '2', ‘John’)
             
            await contract.submitTransaction('TransferProduct',req.params.id,req.body.newArea);
            console.log('Transaction has been submitted');
            res.send('Transaction has been submitted');
             
            // Disconnect from the gateway.
            await gateway.disconnect();
             
            } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
            }
            });

            app.get('/api/GetProductHistory/:id', async function (req, res) {
                try {
                // load the network configuration
                const ccpPath = path.resolve(__dirname, '..', 'dev','fabric-samples','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
                const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
                 
                // Create a new file system based wallet for managing identities.
                const walletPath = path.join(process.cwd(), 'wallet');
                const wallet = await Wallets.newFileSystemWallet(walletPath);
                console.log(`Wallet path: ${walletPath}`);
                 
                // Check to see if we've already enrolled the user.
                const identity = await wallet.get('appUser');
                if (!identity) {
                console.log('An identity for the user "appUser" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
                }
                 
                // Create a new gateway for connecting to our peer node.
                const gateway = new Gateway();
                await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
                 
                // Get the network (channel) our contract is deployed to.
                const network = await gateway.getNetwork('testchannel');
                 
                // Get the contract from the network.
                const contract = network.getContract('supply_chain');
                 
                // Evaluate the specified transaction
                // QueryProductById transaction - requires one argument ex: ('QueryProductById', '2')
                 
                const result = await contract.evaluateTransaction('GetProductHistory',req.params.id);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                res.status(200).json({response: result.toString()});
                 
                // Disconnect from the gateway.
                await gateway.disconnect();
                 
                } catch (error) {
                console.error(`Failed to evaluate transaction: ${error}`);
                process.exit(1);
                }
                });
            
app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');