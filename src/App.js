
import './App.css';
import {useState , useEffect} from "react";
import { ethers } from 'ethers';

function App() {

  const {ethereum} = window;
     
  const [address,setAddress] = useState('caonnect to wallet');
  const [balance,setBalance] = useState('');


  useEffect(() =>{
    ethereum.on("accountsChanged",(accounts)=>{
      setAddress(accounts[0])
      const getbal = async () => {
        const balance = await ethereum.request({method:"eth_getBalance",
    
        params:[accounts[0], 'latest']
     
     });
     setBalance(ethers.utils.formatEther(balance));
      }
      getbal();
    })
    ethereum.on("chainChanged",(chai)=>{
      console.log(chai);
    })
  },[])

  const changechain = async()=>{
    await ethereum.request({method:"wallet_addEthereumChain",
       params:[
        {
          chainId: `0x13881`,
          chainName:"polygon Testnet",
          nativeCurrency:{
            name:"MATIC",
            symbol:"MATIC",
            decimals:18,
          },
          rpcUrls:["https://rpc-mumbai.maticvigil.com/"],
          blockExplorerUrls:["https://mumbai.polygonscan.com/"],
        }
       ]
  })
  }

  const sendTx = async ()=>{
    await ethereum.request({method:"eth_sendTransaction",
    params:[
      {
        to:'0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
        from:address,
        value:'0x174876E800',
        chainId:'0x3',
      }
    ]
  })
  }

  const requestAccount = async () =>{
    await ethereum.request({method:"wallet_requestPermissions",
    
    params:[{
      eth_accounts:{}
    }]

  });

  const accounts = await ethereum.request({method:"eth_requestAccounts"});
  
  
  setAddress(accounts[0]);
  const balance = await ethereum.request({method:"eth_getBalance",
    
        params:[accounts[0], 'latest']
     
     });
     setBalance(ethers.utils.formatEther(balance));
  

     
  }


  return (
    <div className="App">
      <header className="App-header">
       
        <a
          className="App-link"
          onClick={requestAccount}
          
         
        >{address}</a>
           
          <a
          className="App-link"
          
          
         
        > {balance}</a>
       <a
          className="App-link"
          
          
         onClick={changechain}
        > add chain</a>

<a
          className="App-link"
          
          
         onClick={sendTx}
        > send transaction</a>
       
        
        
      </header>
    </div>
  );
}

export default App;
