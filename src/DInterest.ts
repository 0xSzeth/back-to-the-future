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

let POOL_ADDRESSES = new Array<string>(0);
POOL_ADDRESSES.push("0x11B1c87983F881B3686F8b1171628357FAA30038"); // cDAI
POOL_ADDRESSES.push("0x5dda04b2BDBBc3FcFb9B60cd9eBFd1b27f1A4fE3"); // cUNI
POOL_ADDRESSES.push("0x572bE575D1aA1Ca84d8Ac4274067f7bCB578a368"); // cLINK
POOL_ADDRESSES.push("0x6D97eA6e14D35e10b50df9475e9EFaAd1982065E"); // aDAI
POOL_ADDRESSES.push("0x2d3141f4C9872d4F53B587C3fB8b22736FeB54b0"); // aUSDC
POOL_ADDRESSES.push("0xb1b225402b5eC977AF8c721f42F21Db5518785dc"); // aUSDT
POOL_ADDRESSES.push("0x5b1a10aAF807d4297048297c30B2504b42C3395F"); // harvestCRVRENWBTC

let POOL_STABLECOIN_DECIMALS = new Array<i32>(0);
POOL_STABLECOIN_DECIMALS.push(18); // cDAI
POOL_STABLECOIN_DECIMALS.push(18); // cUNI
POOL_STABLECOIN_DECIMALS.push(18); // cLINK
POOL_STABLECOIN_DECIMALS.push(18); // aDAI
POOL_STABLECOIN_DECIMALS.push(6); // aUSDC
POOL_STABLECOIN_DECIMALS.push(6); // aUSDT
POOL_STABLECOIN_DECIMALS.push(18); // harvestCRVRENWBTC

let POOL_DEPLOY_BLOCKS = new Array<i32>(0);
POOL_DEPLOY_BLOCKS.push(13135260) // cDAI
POOL_DEPLOY_BLOCKS.push(13156898) // cUNI
POOL_DEPLOY_BLOCKS.push(13157335) // cLINK
POOL_DEPLOY_BLOCKS.push(13157722) // aDAI
POOL_DEPLOY_BLOCKS.push(13158219) // aUSDC
POOL_DEPLOY_BLOCKS.push(13160904) // aUSDT
POOL_DEPLOY_BLOCKS.push(13163970) // harvestCRVRENWBTC

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
