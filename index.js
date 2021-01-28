import * as ethers from 'ethers'
import * as express from 'express'

const app = express()

// const MNEMONIC = process.env.MNEMONIC
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = '0xf6FFd12C5Ed913e8f2eB89b46b865C4B1e1c57e2'
const ABI = [
    'function set(uint x)',
    'function get() public view returns (uint)'
]

// define first endpoint '/get'
// this will simply read the value from the smart contract
app.get('/get', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    // try to read value asynchronosly
    try {
        const value = await contract.value()
        res.send(value)
    } catch (e) {
        res.send(e)
    }
})

// next endpoint '/set'
app.get('/set/:value', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const wallet = ethers.Wallet(PRIVATE_KEY).connect(provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet) // use wallet to be able to sign tx!
    // try
    try {
        await contract.setValue(req.params.value)
        res.send('OK')
    } catch (e) {
        res.send(e)
    }
})

// with endpoints defined above we can tell express to listen for incoming requests
app.listen()




