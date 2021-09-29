import { BigDecimal, BigInt, Address, ByteArray, crypto, ethereum } from "@graphprotocol/graph-ts";
import {
  DInterest,
  EDeposit,
  EFund,
  EPayFundingInterest,
  ERolloverDeposit,
  ESetParamAddress,
  ESetParamUint,
  ETopupDeposit,
  EWithdraw,
  OwnershipTransferred
} from "../generated/cDAIPool/DInterest";
import { IInterestOracle } from "../generated/cDAIPool/IInterestOracle";
import { DPool } from "../generated/schema";

let YEAR = BigInt.fromI32(31556952); // One year in seconds
let ZERO_DEC = BigDecimal.fromString('0');
let ONE_DEC = BigDecimal.fromString('1');
let NEGONE_DEC = BigDecimal.fromString('-1');
let BLOCK_HANDLER_INTERVAL = BigInt.fromI32(20); // call block handler every 20 blocks

// Note: the addresses below must be in lower case
let POOL_ADDRESSES = new Array<string>(0);
POOL_ADDRESSES.push("0x11b1c87983f881b3686f8b1171628357faa30038"); // cDAI
POOL_ADDRESSES.push("0x5dda04b2bdbbc3fcfb9b60cd9ebfd1b27f1a4fe3"); // cUNI
POOL_ADDRESSES.push("0x572be575d1aa1ca84d8ac4274067f7bcb578a368"); // cLINK
POOL_ADDRESSES.push("0x6bf909ce507e94608f0fcbab2cfdd499e0150a21"); // cBAT
POOL_ADDRESSES.push("0xc1f147db2b6a9c9fbf322fac3d1fbf8b8aaeec10"); // cCOMP
POOL_ADDRESSES.push("0x7f10134c32a4544e4cdc0fd57f5c820bff3070e9"); // cUSDT
POOL_ADDRESSES.push("0xa0e78812e9cd3e754a83bbd74a3f1579b50436e8"); // cWBTC
POOL_ADDRESSES.push("0x0f834c3601088d1b060c47737a2f5ce4ffa5ac1d"); // cZRX
POOL_ADDRESSES.push("0x085d70ca0dade4683d0f59d5a5b7d3298011b4de"); // cTUSD
POOL_ADDRESSES.push("0x7dc14d047d6d8bb03539f92b9e2ca1f1648a5717"); // cUSDC

POOL_ADDRESSES.push("0x6d97ea6e14d35e10b50df9475e9efaad1982065e"); // aDAI
POOL_ADDRESSES.push("0x2d3141f4c9872d4f53b587c3fb8b22736feb54b0"); // aUSDC
POOL_ADDRESSES.push("0xb1b225402b5ec977af8c721f42f21db5518785dc"); // aUSDT
POOL_ADDRESSES.push("0x24867f5665414d93f7b3d195f848917d57d5be27"); // aBAL
POOL_ADDRESSES.push("0x8eb1b3ac29e0dcbd7f519c86f1eb76a3aea41b76"); // aCRV
POOL_ADDRESSES.push("0xbfdb51ec0adc6d5bf2ebba54248d40f81796e12b"); // aGUSD
POOL_ADDRESSES.push("0x6e6002a4bd704a3c8e24a70b0be670f1c2b4d35c"); // aLINK
POOL_ADDRESSES.push("0x2a74f09a8e4899115529ec8808c5fc1de62c2fe4"); // aRAI
POOL_ADDRESSES.push("0x4d794db79c4a85dc763d08a7c440a92a2d153ffd"); // aREN
POOL_ADDRESSES.push("0x60f0f24b0fbf066e877c3a89014c2e4e98c33678"); // aSNX
POOL_ADDRESSES.push("0x10e8bd414eee26d82e88d6e308fd81ef37d03155"); // aTUSD
POOL_ADDRESSES.push("0xf50ef673ee810e6acb725f941a53bf92586a39ad"); // aUSDP
POOL_ADDRESSES.push("0x0fd585328666923a3a772dd5c37e2dc065c7b137"); // aWBTC
POOL_ADDRESSES.push("0xae5dde7ea5c44b38c0bccfb985c40006ed744ea6"); // aWETH
POOL_ADDRESSES.push("0x1821aadb9ac1b7e4d56c728afdadc7541a785cd2"); // aYFI
POOL_ADDRESSES.push("0xafdd82d73f5dae907f86ad37f346221081dc917b"); // aSUSD

POOL_ADDRESSES.push("0x5b1a10aaf807d4297048297c30b2504b42c3395f"); // harvestCRVRENWBTC

POOL_ADDRESSES.push("0x4b4626c1265d22b71ded11920795a3c6127a0559"); // bDAI
POOL_ADDRESSES.push("0x4f7ec502ca0be8ef1f984ab1f164022a15ff5561"); // bUSDC
POOL_ADDRESSES.push("0x062214fbe3f15d217512deb14572eb01face0392"); // bUSDT

POOL_ADDRESSES.push("0x46603a1cca20e7ae18f1a069125369609d9d4153"); // crFTT
POOL_ADDRESSES.push("0xf61681b8cbf87615f30f96f491fa28a2ff39947a"); // crUSDC
POOL_ADDRESSES.push("0x3816579c8cb62500a45ae29a33040a3dea4160de"); // crUSDT

let POOL_STABLECOIN_DECIMALS = new Array<i32>(0);
POOL_STABLECOIN_DECIMALS.push(18); // cDAI
POOL_STABLECOIN_DECIMALS.push(18); // cUNI
POOL_STABLECOIN_DECIMALS.push(18); // cLINK
POOL_STABLECOIN_DECIMALS.push(18); // cBAT
POOL_STABLECOIN_DECIMALS.push(18); // cCOMP
POOL_STABLECOIN_DECIMALS.push(6); // cUSDT
POOL_STABLECOIN_DECIMALS.push(8); // cWBTC
POOL_STABLECOIN_DECIMALS.push(18); // cZRX
POOL_STABLECOIN_DECIMALS.push(18); // cTUSD
POOL_STABLECOIN_DECIMALS.push(6); // cUSDC

POOL_STABLECOIN_DECIMALS.push(18); // aDAI
POOL_STABLECOIN_DECIMALS.push(6); // aUSDC
POOL_STABLECOIN_DECIMALS.push(6); // aUSDT
POOL_STABLECOIN_DECIMALS.push(18); // aBAL
POOL_STABLECOIN_DECIMALS.push(18); // aCRV
POOL_STABLECOIN_DECIMALS.push(2); // aGUSD
POOL_STABLECOIN_DECIMALS.push(18); // aLINK
POOL_STABLECOIN_DECIMALS.push(18); // aRAI
POOL_STABLECOIN_DECIMALS.push(18); // aREN
POOL_STABLECOIN_DECIMALS.push(18); // aSNX
POOL_STABLECOIN_DECIMALS.push(18); // aTUSD
POOL_STABLECOIN_DECIMALS.push(18); // aUSDP
POOL_STABLECOIN_DECIMALS.push(8); // aWBTC
POOL_STABLECOIN_DECIMALS.push(18); // aWETH
POOL_STABLECOIN_DECIMALS.push(18); // aYFI
POOL_STABLECOIN_DECIMALS.push(18); // aSUSD

POOL_STABLECOIN_DECIMALS.push(18); // harvestCRVRENWBTC

POOL_STABLECOIN_DECIMALS.push(18); // bDAI
POOL_STABLECOIN_DECIMALS.push(6); // bUSDC
POOL_STABLECOIN_DECIMALS.push(6); // bUSDT

POOL_STABLECOIN_DECIMALS.push(18); // crFTT
POOL_STABLECOIN_DECIMALS.push(6); // crUSDC
POOL_STABLECOIN_DECIMALS.push(6); // crUSDT

let POOL_DEPLOY_BLOCKS = new Array<i32>(0);
POOL_DEPLOY_BLOCKS.push(13135260); // cDAI
POOL_DEPLOY_BLOCKS.push(13156898); // cUNI
POOL_DEPLOY_BLOCKS.push(13157335); // cLINK
POOL_DEPLOY_BLOCKS.push(13296905); // cBAT
POOL_DEPLOY_BLOCKS.push(13297218); // cCOMP
POOL_DEPLOY_BLOCKS.push(13298259); // cUSDT
POOL_DEPLOY_BLOCKS.push(13298887); // cWBTC
POOL_DEPLOY_BLOCKS.push(13299460); // cZRX
POOL_DEPLOY_BLOCKS.push(13297656); // cTUSD
POOL_DEPLOY_BLOCKS.push(13298003); // cUSDC

POOL_DEPLOY_BLOCKS.push(13157722); // aDAI
POOL_DEPLOY_BLOCKS.push(13158219); // aUSDC
POOL_DEPLOY_BLOCKS.push(13160904); // aUSDT
POOL_DEPLOY_BLOCKS.push(13279052); // aBAL
POOL_DEPLOY_BLOCKS.push(13279338); // aCRV
POOL_DEPLOY_BLOCKS.push(13279808); // aGUSD
POOL_DEPLOY_BLOCKS.push(13279959); // aLINK
POOL_DEPLOY_BLOCKS.push(13280551); // aRAI
POOL_DEPLOY_BLOCKS.push(13280877); // aREN
POOL_DEPLOY_BLOCKS.push(13281099); // aSNX
POOL_DEPLOY_BLOCKS.push(13283844); // aTUSD
POOL_DEPLOY_BLOCKS.push(13284197); // aUSDP
POOL_DEPLOY_BLOCKS.push(13284462); // aWBTC
POOL_DEPLOY_BLOCKS.push(13284713); // aWETH
POOL_DEPLOY_BLOCKS.push(13285014); // aYFI
POOL_DEPLOY_BLOCKS.push(13283471); // aSUSD

POOL_DEPLOY_BLOCKS.push(13163970); // harvestCRVRENWBTC

POOL_DEPLOY_BLOCKS.push(13304573); // bDAI
POOL_DEPLOY_BLOCKS.push(13304799); // bUSDC
POOL_DEPLOY_BLOCKS.push(13305237); // bUSDT

POOL_DEPLOY_BLOCKS.push(13305708); // crFTT
POOL_DEPLOY_BLOCKS.push(13305854); // crUSDC
POOL_DEPLOY_BLOCKS.push(13305995); // crUSDT

export function keccak256(s: string): ByteArray {
  return crypto.keccak256(ByteArray.fromUTF8(s));
}

export function tenPow(exponent: number): BigInt {
  let result = BigInt.fromI32(1);
  for (let i = 0; i < exponent; i++) {
    result = result.times(BigInt.fromI32(10));
  }
  return result;
}

export function normalize(i: BigInt, decimals: number = 18): BigDecimal {
  return i.toBigDecimal().div(new BigDecimal(tenPow(decimals)));
}

export function getPool(poolAddress: string): DPool {
  let pool = DPool.load(poolAddress);
  if (pool == null) {
    pool = new DPool(poolAddress);
    let poolContract = DInterest.bind(Address.fromString(poolAddress));

    pool.address = poolAddress;
    pool.moneyMarket = poolContract.moneyMarket().toHex();
    pool.stablecoin = poolContract.stablecoin().toHex();
    pool.interestModel = poolContract.interestModel().toHex();
    pool.oneYearInterestRate = ZERO_DEC;
    pool.oracleInterestRate = ZERO_DEC;
    pool.surplus = ZERO_DEC;

    pool.save();
  }
  return pool as DPool;
}

export function handleEDeposit(event: EDeposit): void {}

export function handleEFund(event: EFund): void {}

export function handleEPayFundingInterest(event: EPayFundingInterest): void {}

export function handleERolloverDeposit(event: ERolloverDeposit): void {}

export function handleESetParamAddress(event: ESetParamAddress): void {
  let pool = getPool(event.address.toHex());
  let paramName = event.params.paramName;
  if (paramName == keccak256("interestModel")) {
    pool.interestModel = event.params.newValue.toHex();
  }
  pool.save();
}

export function handleESetParamUint(event: ESetParamUint): void {}

export function handleETopupDeposit(event: ETopupDeposit): void {}

export function handleEWithdraw(event: EWithdraw): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleBlock(block: ethereum.Block): void {
  if (block.number.mod(BLOCK_HANDLER_INTERVAL).isZero()) {
    let blockNumber = block.number.toI32();
    for (let i = 0; i < POOL_ADDRESSES.length; i++) {
      if (blockNumber >= POOL_DEPLOY_BLOCKS[i]) {

        let poolID = POOL_ADDRESSES[i];
        let pool = getPool(poolID);
        let poolContract = DInterest.bind(Address.fromString(pool.address));
        let stablecoinDecimals: number = POOL_STABLECOIN_DECIMALS[i];
        let oracleContract = IInterestOracle.bind(poolContract.interestOracle());

        let oneYearInterestRate = poolContract.try_calculateInterestAmount(tenPow(18), YEAR);
        pool.oneYearInterestRate = oneYearInterestRate.reverted
          ? null
          : normalize(oneYearInterestRate.value)

        let oracleInterestRate = oracleContract.try_updateAndQuery();
        pool.oracleInterestRate = oracleInterestRate.reverted
          ? null
          : normalize(oracleInterestRate.value.value1)

        let surplusResult = poolContract.try_surplus();
        pool.surplus = surplusResult.reverted
          ? null
          : normalize(surplusResult.value.value1, stablecoinDecimals).times(surplusResult.value.value0 ? NEGONE_DEC : ONE_DEC)

        pool.save();

      }
    }
  }
}
