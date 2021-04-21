import React, {useEffect, useState} from "react";
import Web3 from "web3";

function App() {
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  let lotterytAddress = '0xFBDfAcc449554594CE132918037C02b1473d842d';
  let lotteryABI = [{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"}, {
      "indexed": true,
      "internalType": "address",
      "name": "bettor",
      "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
      "indexed": false,
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }, {"indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256"}],
    "name": "BET",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"}, {
      "indexed": false,
      "internalType": "address",
      "name": "bettor",
      "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
      "indexed": false,
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }, {"indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1"}, {
      "indexed": false,
      "internalType": "uint256",
      "name": "answerBlockNumber",
      "type": "uint256"
    }],
    "name": "DRAW",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"}, {
      "indexed": false,
      "internalType": "address",
      "name": "bettor",
      "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
      "indexed": false,
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }, {"indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1"}, {
      "indexed": false,
      "internalType": "uint256",
      "name": "answerBlockNumber",
      "type": "uint256"
    }],
    "name": "FAIL",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"}, {
      "indexed": false,
      "internalType": "address",
      "name": "bettor",
      "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
      "indexed": false,
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }, {"indexed": false, "internalType": "uint256", "name": "answerBlockNumber", "type": "uint256"}],
    "name": "REFUND",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "internalType": "uint256", "name": "index", "type": "uint256"}, {
      "indexed": false,
      "internalType": "address",
      "name": "bettor",
      "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
      "indexed": false,
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }, {"indexed": false, "internalType": "bytes1", "name": "answer", "type": "bytes1"}, {
      "indexed": false,
      "internalType": "uint256",
      "name": "answerBlockNumber",
      "type": "uint256"
    }],
    "name": "WIN",
    "type": "event"
  }, {
    "constant": true,
    "inputs": [],
    "name": "answerForTest",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "getPot",
    "outputs": [{"internalType": "uint256", "name": "pot", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes1", "name": "challenges", "type": "bytes1"}],
    "name": "betAndDistribute",
    "outputs": [{"internalType": "bool", "name": "result", "type": "bool"}],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes1", "name": "challenges", "type": "bytes1"}],
    "name": "bet",
    "outputs": [{"internalType": "bool", "name": "result", "type": "bool"}],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "distribute",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{"internalType": "bytes32", "name": "answer", "type": "bytes32"}],
    "name": "setAnswerForTest",
    "outputs": [{"internalType": "bool", "name": "result", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "bytes1", "name": "challenges", "type": "bytes1"}, {
      "internalType": "bytes32",
      "name": "answer",
      "type": "bytes32"
    }],
    "name": "isMatch",
    "outputs": [{"internalType": "enum Lottery.BettingResult", "name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "getBetInfo",
    "outputs": [{
      "internalType": "uint256",
      "name": "answerBlockNumber",
      "type": "uint256"
    }, {"internalType": "address", "name": "bettor", "type": "address"}, {
      "internalType": "bytes1",
      "name": "challenges",
      "type": "bytes1"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }]
  let lotteryContract = new web3.eth.Contract(lotteryABI, lotterytAddress)
  const [account, setAccount] = useState('');
  const [betRecords, setBetRecords] = useState([]);
  const [winRecords, setWinRecords] = useState([]);
  const [failRecords, setFailRecords] = useState([]);
  const [pot, setPot] = useState('0');
  const [challenges, setChallenges] = useState(['A', 'B']);
  const [finalRecords, setFinalRecords] = useState([{
    bettor: '0xabcd...',
    index: '0',
    challenges: 'ab',
    answer: 'ab',
    targetBlockNumber: '10',
    pot: '0'
  }])

  useEffect(() => {
    async function fetchWeb3() {
      await initWeb3().then(r => console.log(r));
    }

    fetchWeb3();

    pollData();
    //setInterval(pollData, 1000);
  }, [])

  const pollData = async () => {
    await getPot();

    await getBetEvents();
    await getWinEvents();
    await getFailEvents();
    makeFinalRecords();
  }
  const initWeb3 = async () => {
    if (window.ethereum) {
      console.log('recent mode')
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      try {
        await window.enthereum.enable();
        //web3.eth.sendTransaction({})
      } catch (error) {
        //user denied account access...
        console.log("user denied account access...");
      }
    } else if (window.web3) {
      console.log('legacy mode')
      window.web3 = new Web3(Web3.currentProvider);
    } else {
      console.log('none-ethereum browser detected ')
    }

    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    setAccount(account);

    let owner = await lotteryContract.methods.owner().call()
    console.log('owner', owner)

  };
  const getPot = async () => {
    let pot = await lotteryContract.methods.getPot().call()
    let potString = web3.utils.fromWei(pot.toString(), 'ether');
    setPot(potString);
  }
  const getBetEvents = async () => {
    const records = []
    let events = await lotteryContract.getPastEvents('BET', {fromBlock: 0, toBlock: 'latest'})

    for (let i = 0; i < events.length; i++) {
      const record = {}
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.bettor = events[i].returnValues.bettor;
      record.betBlockNumber = events[i].blockNumber;
      record.targetBlockNumber = events[i].returnValues.answerBlockNumber.toString();
      record.challenges = events[i].returnValues.challenges;
      record.win = "Not Revealed";
      record.answer = '0x00';
      records.unshift(record);
    }

    setBetRecords(records);
    console.log('betevent', records)
  }
  const getWinEvents = async () => {
    const records = []
    let events = await lotteryContract.getPastEvents('WIN', {fromBlock: 0, toBlock: 'latest'})

    for (let i = 0; i < events.length; i++) {
      const record = {}
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.amount = parseInt(events[i].returnValues.amount, 10).toString();
      records.unshift(record);
    }

    setWinRecords(records)
    console.log('winevent', records)
    console.log('winrecords',winRecords)
  }
  const getFailEvents = async () => {
    const records = []
    let events = await lotteryContract.getPastEvents('FAIL', {fromBlock: 0, toBlock: 'latest'})

    for (let i = 0; i < events.length; i++) {
      const record = {}
      record.index = parseInt(events[i].returnValues.index, 10).toString();
      record.answer = events[i].returnValues.answer;
      records.unshift(record);
    }

    setFailRecords(records)
    console.log('Failevent', records)
    console.log('failrecords',failRecords);
  }
  const makeFinalRecords = () => {
    let f = 0, w = 0;
    const records = [...betRecords];
    console.log(records,'records')
    console.log('betrecords',betRecords);
    for (let i = 0; betRecords.length; i++) {
      if (winRecords.length > 0 && betRecords[i].index === winRecords[w].index) {
        records[i].win = 'WIN'
        records[i].answer = records[i].challenges;
        records[i].pot = web3.utils.fromWei(winRecords[w].amount, 'ether')
        if (winRecords.length - 1 > w) w++;
      } else if (failRecords.length > 0 && betRecords[i].index === failRecords[f].index) {
        records[i].win = 'FAIL'
        records[i].answer = failRecords[f].answer;
        records[i].pot = 0;
        if (failRecords.length - 1 > f) f++;
      } else {
        records[i].answer = 'Not Revealed';
      }

    }
    setFinalRecords(records)
    console.log('final',finalRecords);
  }
  const bet = async () => {
    console.log(challenges);
    let chal = `0x${challenges[0].toLowerCase()}${challenges[1].toLowerCase()}`
    //nonce
    let nonce = await web3.eth.getTransactionCount(account)
    lotteryContract.methods.betAndDistribute(chal).send({
      from: account,
      value: 5000000000000000,
      gas: 300000,
      nonce: nonce
    })
        .on('transactionHash', (hash) => {
          console.log(hash)
        })
  }

  const onClickCard = (_character) => {
    setChallenges([challenges[1], _character])
  }
  const getCard = (_character, _cardStyle) => {
    let _card = ''
    if (_character === 'A') {
      _card = '🂡'
    }
    if (_character === 'B') {
      _card = '🂱'
    }
    if (_character === 'C') {
      _card = '🃁'
    }
    if (_character === '0') {
      _card = '🃑'
    }
    return (
        <button className={_cardStyle} onClick={() => {
          onClickCard(_character)
        }}>
          <div className="card-body text-center">
            <p className="card-text"></p>
            <p className="card-text text-center" style={{fontSize: '300px'}}>{_card}</p>
            <p className="card-text"></p>
          </div>
        </button>
    )
  }
  return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1>Current Pot: {pot}</h1>
            <p>Lottery</p>
            <p>Lottery tutorial</p>
            <p>Your Bet</p>
            <p>{challenges[0]} {challenges[1]}</p>
          </div>
        </div>
        <div className="container">
          <div className="card-group" style={{display: 'flex'}}>
            {getCard("A", "card bg-primary")}
            {getCard("B", "card bg-danger")}
            {getCard("C", "card bg-warning")}
            {getCard("0", "card bg-success")}
          </div>
        </div>
        <br/>
        <div className="container" style={{textAlign: 'center'}}>
          <button className="btn btn-danger btn-lg" onClick={() => bet()}>BET!</button>
        </div>
        <br/>
        <div className="container">
          <table className="table table-dark table-striped">
            <thead>
            <tr>
              <th>Index</th>
              <th>Address</th>
              <th>Challenge</th>
              <th>Answer</th>
              <th>Pot</th>
              <th>Status</th>
              <th>AnswerBlockNumber</th>
            </tr>
            </thead>
            <tbody>
            {finalRecords.map((record, index) => {
              return (
                  <tr key={index}>
                    <td>{record.index}</td>
                    <td>{record.bettor}</td>
                    <td>{record.challenges}</td>
                    <td>{record.answer}</td>
                    <td>{record.pot}</td>
                    <td>{record.win}</td>
                    <td>{record.targetBlockNumber}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
  );

}
export default App;
