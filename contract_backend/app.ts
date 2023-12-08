
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

console.log("aaaa");

const feedbackCount = {
  A: 0,
  B: 0,
  C: 0
};

app.post('/generateProof', async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await calculate(id);
  res.json({ result });
});

async function calculate(id: number): Promise<string> {
  /
  if (id === 1) {
    feedbackCount.A++;
  } else if (id === 2) {
    feedbackCount.B++;
  } else if (id === 3) {
    feedbackCount.C++;
  }

  
  return JSON.stringify(feedbackCount);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// import express, { Request, Response } from 'express';
// import { ethers } from 'ethers';


// const app = express();
// const port = 3000;

// app.use(express.json());

// console.log("aaaa")
// //const provider = new ethers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/e6JB2za7kW1C3RCAXvS_FnrXLTYGN3ji`);
// const privateKey = '6216bcaf0adaaebae22c670c4db2d5b0b22c341e7b91308b39ec9ffbb4471393';
// //const wallet = new ethers.Wallet(privateKey, provider);



// const contractAddress = '0x8B8Ed11223d7438274C011d1F5a36c12a3C00e22';
// const contractAbi = [
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "groupId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "feedbackType",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "newValue",
//           "type": "uint256"
//         }
//       ],
//       "name": "FeedbackAdded",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "feedbackA",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "feedbackB",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "feedbackC",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "groupId",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "feedback",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "merkleTreeRoot",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "nullifierHash",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256[8]",
//           "name": "proof",
//           "type": "uint256[8]"
//         }
//       ],
//       "name": "sendFeedback",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ]; 

// //const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

// app.post('/generateProof', async (req: Request, res: Response) => {
//   const { id } = req.body;
  
//   const {} = await calculate(id);
//   res.json({ proof });
// });

// async function calculate(id: number): Promise<string> {

//  //for demo
//   const feedback =  0x48656c6c6f20576f726c64000000000000000000000000000000000000000000; 
//   const merkleTreeRoot = 6021330630486110644315170447257362299323044077734478685258377575510022074771; 
//   const nullifierHash = 1417975019279511062820830953620223780980941164824451733661118607985211890239; 
//   const proof = [
//     '20979068446941769467691690232439486157703593346991803215449669776468857288354',
//     '15192359095132740601324793178812160482806534815813876075854081040446777016987',
//     '1716420531608092426771016579986132502161962344882274763334154767082868563117',
//     '14624255951429454460386325386224173015941008950050831165889778404704044430847',
//     '6881331980410915727929021702657943143106658111202784604060835174700266853712',
//     '15198193589261677490995138473172305675603088038069527869451815997393976380731',
//     '15939492300868500093234976916642927708781045472662281091821560509165090428375',
//     '21640521068009539276751039986237348795672857437894754619640351250415727548499'
//   ]; 

// //   try {
// //     const tx = await contract.sendFeedback(feedback, merkleTreeRoot, nullifierHash, proof);
// //     await tx.wait(); 
// //     return 'Transaction successful';
// //   } catch (error) {
// //     console.error('Error sending feedback:', error.message);
// //     return 'Transaction failed';
// //   }
// }

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
