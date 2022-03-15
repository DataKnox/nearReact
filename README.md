# nearReact
## First:
Make sure you have a Testnet wallet already setup  
[Get Testnet Wallet](https://wallet.testnet.near.org/)


## Second:
Clone the repo  

    cd $home
    mkdir nearKnox
    cd nearKnox
    git clone https://github.com/dataknox/nearReact.git
    
## Third
Login to Near Testnet

    near login

NOTE: If you need to, install the Near CLI

    npm install near-cli

## Fourth 
Install dependencies

    cd nearReact/app/
    yarn install
    cd contract/
    yarn install
    cd ..

## Fifth
Run the codez

    yarn start