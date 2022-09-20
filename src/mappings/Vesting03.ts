import { Staked, RewardPaid, Transfer } from "../../generated/Vesting03/Vesting03";
import { Vesting02 } from "../../generated/Vesting02/Vesting02";
import { Deposit } from "../../generated/schema";

import { getVest } from '../utils/entities';
import { normalize } from '../utils/math';

export function handleStaked(event: Staked): void {
  let vest = getVest(event.address, event.params.vestID);
  vest.save();

  // update Deposit
  let deposit = Deposit.load(vest.deposit);
  if (deposit !== null) {
    deposit.vest = vest.id
    deposit.save();
  }
}

export function handleRewardPaid(event: RewardPaid): void {
  let vest = getVest(event.address, event.params.vestID);

  let amount = normalize(event.params.reward);
  vest.withdrawnAmount = vest.withdrawnAmount.plus(amount);
  vest.save();
}

export function handleTransfer(event: Transfer): void {
  let vest = getVest(event.address, event.params.tokenId);
  vest.owner = event.params.to.toHex();
  vest.save();
}
