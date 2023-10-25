import Home from "./Pages/Home/Index";
import Nav from "./Components/Navbar/Navbar";
import { ethers } from "ethers";
import { useState } from "react";
import simple_token_abi from "./Contracts/bank_app_abi.json";
import { useToast } from "@chakra-ui/react";

function App() {
  const toast = useToast();
  //Bankapp.sol deployed on goerli test network2
  let contractAddress = "0xF0bd923815B43b29141967ab94140C57C8def252";

  //States
  const [defaultAccount, setDefaultAccount] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [transferHash, setTransferHash] = useState(null);
  const [checkAcc, setCheckAcc] = useState(false);
  const [accbalance, setAccBalance] = useState(0);

  const logOutHandler = () => {
    setDefaultAccount(null);
  };

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          toast({
            title: "Successfully connected",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          accountChangedHandler(result[0]);
        })
        .catch((error) => {
          toast({
            title: "Faild to connect",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      console.log("Need to install MetaMask");
      toast({
        title: "Faild to connect",
        description: "Please install MetaMask browser extension to interact",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum &&
    window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum && window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    setContract(tempContract);
    checkAccountExists(tempContract);
    AccountBalance(tempContract);
  };

  const createAccount = async () => {
    let txt = await contract.createAcc();
    console.log(txt);
    toast({
      title: "Successfully created",
      description: "Your account is created",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    checkAccountExists();
  };
  const checkAccountExists = async (contractTemp) => {
    let txt = await (contractTemp
      ? contractTemp.accountExists()
      : contract.accountExists());
    if (txt) {
      console.log(txt, "text");
      setCheckAcc(true);
    }
  };

  const AccountBalance = async (tempContract) => {
    let txt = await (tempContract
      ? tempContract.accountBalance()
      : contract.accountBalance());
    let balanceNumber = txt.toNumber();
    //let tokenDecimals = await contract.decimals();
    console.log(balanceNumber);
    setAccBalance("" + balanceNumber);
  };
  const DepositBalance = async (value) => {
    let depositAmount = value;
    let txt = await contract.deposit({
      value: depositAmount,
    });
    AccountBalance();
  };
  const transferHandler = async (data) => {
    debugger;
    let transferAmount = data.amount;
    let recieverAddress = data.address;
    let txt = await contract.transferEther(recieverAddress, transferAmount);
    setTransferHash("Transfer confirmation hash: " + txt.hash);
    toast({
      title: "Transfer confirmation hash",
      description: txt.hash,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    AccountBalance();
  };
  const WithdrawBalance = async (value) => {
    let withdrawAmount = value;
    let txt = await contract.withdraw(withdrawAmount);
    console.log(txt);
    AccountBalance();
  };

  return (
    <div>
      <Nav
        connectWallet={connectWalletHandler}
        account={defaultAccount}
        logout={logOutHandler}
        balance={accbalance}
        checkBallence={AccountBalance}
      />
      <Home
        accountACC={checkAcc}
        createAccount={createAccount}
        account={defaultAccount}
        connectWallet={connectWalletHandler}
        transferMoney={transferHandler}
        depositMoney={DepositBalance}
        withdrawMoney={WithdrawBalance}
      />
    </div>
  );
}

export default App;
