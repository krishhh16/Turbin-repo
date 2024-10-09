import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Preq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))

const connection = new Connection("https://api.devnet.solana.com")

const github = Buffer.from("`krishhh16", "utf8")
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });
const program: Program<Turbin3Preq> = new Program(IDL, provider);

const enrollment_seeds = [Buffer.from("prereq"),keypair.publicKey.toBuffer()];

(async () => { 
    try { 
    const [enrollment_key, _bump] = await PublicKey.findProgramAddressSync(enrollment_seeds, program.programId)
    const txhash = await program.methods 
    .complete(github) 
    .accounts({ 
    signer: keypair.publicKey, 
    }) 
    .signers([ 
    keypair 
    ]).rpc(); 
    console.log(`Success! Check out your TX here: 
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`); } catch(e) {
    console.error(`Oops, something went wrong: ${e}`) 
    } 
})()    
