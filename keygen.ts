import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();
console.log("public key: ", kp.publicKey.toBase58());
console.log(`[${kp.secretKey}]`);
