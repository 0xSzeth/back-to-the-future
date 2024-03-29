// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DistributionsToggled extends ethereum.Event {
  get params(): DistributionsToggled__Params {
    return new DistributionsToggled__Params(this);
  }
}

export class DistributionsToggled__Params {
  _event: DistributionsToggled;

  constructor(event: DistributionsToggled) {
    this._event = event;
  }

  get distibutions_state(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class GaugeStateChanged extends ethereum.Event {
  get params(): GaugeStateChanged__Params {
    return new GaugeStateChanged__Params(this);
  }
}

export class GaugeStateChanged__Params {
  _event: GaugeStateChanged;

  constructor(event: GaugeStateChanged) {
    this._event = event;
  }

  get gauge_address(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get is_middleman(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }

  get is_active(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class OwnerChanged extends ethereum.Event {
  get params(): OwnerChanged__Params {
    return new OwnerChanged__Params(this);
  }
}

export class OwnerChanged__Params {
  _event: OwnerChanged;

  constructor(event: OwnerChanged) {
    this._event = event;
  }

  get oldOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnerNominated extends ethereum.Event {
  get params(): OwnerNominated__Params {
    return new OwnerNominated__Params(this);
  }
}

export class OwnerNominated__Params {
  _event: OwnerNominated;

  constructor(event: OwnerNominated) {
    this._event = event;
  }

  get newOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RecoveredERC20 extends ethereum.Event {
  get params(): RecoveredERC20__Params {
    return new RecoveredERC20__Params(this);
  }
}

export class RecoveredERC20__Params {
  _event: RecoveredERC20;

  constructor(event: RecoveredERC20) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RewardDistributed extends ethereum.Event {
  get params(): RewardDistributed__Params {
    return new RewardDistributed__Params(this);
  }
}

export class RewardDistributed__Params {
  _event: RewardDistributed;

  constructor(event: RewardDistributed) {
    this._event = event;
  }

  get gauge_address(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get reward_amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class GaugeRewardDistributor__distributeRewardResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class GaugeRewardDistributor extends ethereum.SmartContract {
  static bind(address: Address): GaugeRewardDistributor {
    return new GaugeRewardDistributor("GaugeRewardDistributor", address);
  }

  curator_address(): Address {
    let result = super.call(
      "curator_address",
      "curator_address():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_curator_address(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "curator_address",
      "curator_address():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  currentReward(gauge_address: Address): BigInt {
    let result = super.call(
      "currentReward",
      "currentReward(address):(uint256)",
      [ethereum.Value.fromAddress(gauge_address)]
    );

    return result[0].toBigInt();
  }

  try_currentReward(gauge_address: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "currentReward",
      "currentReward(address):(uint256)",
      [ethereum.Value.fromAddress(gauge_address)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  distributeReward(
    gauge_address: Address
  ): GaugeRewardDistributor__distributeRewardResult {
    let result = super.call(
      "distributeReward",
      "distributeReward(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(gauge_address)]
    );

    return new GaugeRewardDistributor__distributeRewardResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_distributeReward(
    gauge_address: Address
  ): ethereum.CallResult<GaugeRewardDistributor__distributeRewardResult> {
    let result = super.tryCall(
      "distributeReward",
      "distributeReward(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(gauge_address)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new GaugeRewardDistributor__distributeRewardResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  distributionsOn(): boolean {
    let result = super.call("distributionsOn", "distributionsOn():(bool)", []);

    return result[0].toBoolean();
  }

  try_distributionsOn(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "distributionsOn",
      "distributionsOn():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  gauge_controller(): Address {
    let result = super.call(
      "gauge_controller",
      "gauge_controller():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_gauge_controller(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "gauge_controller",
      "gauge_controller():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  gauge_whitelist(param0: Address): boolean {
    let result = super.call(
      "gauge_whitelist",
      "gauge_whitelist(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_gauge_whitelist(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "gauge_whitelist",
      "gauge_whitelist(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  global_emission_rate(): BigInt {
    let result = super.call(
      "global_emission_rate",
      "global_emission_rate():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_global_emission_rate(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "global_emission_rate",
      "global_emission_rate():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  is_middleman(param0: Address): boolean {
    let result = super.call("is_middleman", "is_middleman(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_is_middleman(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("is_middleman", "is_middleman(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  last_time_gauge_paid(param0: Address): BigInt {
    let result = super.call(
      "last_time_gauge_paid",
      "last_time_gauge_paid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_last_time_gauge_paid(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "last_time_gauge_paid",
      "last_time_gauge_paid(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nominatedOwner(): Address {
    let result = super.call("nominatedOwner", "nominatedOwner():(address)", []);

    return result[0].toAddress();
  }

  try_nominatedOwner(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "nominatedOwner",
      "nominatedOwner():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  reward_token_address(): Address {
    let result = super.call(
      "reward_token_address",
      "reward_token_address():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_reward_token_address(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "reward_token_address",
      "reward_token_address():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  timelock_address(): Address {
    let result = super.call(
      "timelock_address",
      "timelock_address():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_timelock_address(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "timelock_address",
      "timelock_address():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _timelock_address(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _curator_address(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _reward_token_address(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _gauge_controller_address(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _global_emission_rate(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class DistributeRewardCall extends ethereum.Call {
  get inputs(): DistributeRewardCall__Inputs {
    return new DistributeRewardCall__Inputs(this);
  }

  get outputs(): DistributeRewardCall__Outputs {
    return new DistributeRewardCall__Outputs(this);
  }
}

export class DistributeRewardCall__Inputs {
  _call: DistributeRewardCall;

  constructor(call: DistributeRewardCall) {
    this._call = call;
  }

  get gauge_address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DistributeRewardCall__Outputs {
  _call: DistributeRewardCall;

  constructor(call: DistributeRewardCall) {
    this._call = call;
  }

  get weeks_elapsed(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get reward_tally(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class NominateNewOwnerCall extends ethereum.Call {
  get inputs(): NominateNewOwnerCall__Inputs {
    return new NominateNewOwnerCall__Inputs(this);
  }

  get outputs(): NominateNewOwnerCall__Outputs {
    return new NominateNewOwnerCall__Outputs(this);
  }
}

export class NominateNewOwnerCall__Inputs {
  _call: NominateNewOwnerCall;

  constructor(call: NominateNewOwnerCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class NominateNewOwnerCall__Outputs {
  _call: NominateNewOwnerCall;

  constructor(call: NominateNewOwnerCall) {
    this._call = call;
  }
}

export class RecoverERC20Call extends ethereum.Call {
  get inputs(): RecoverERC20Call__Inputs {
    return new RecoverERC20Call__Inputs(this);
  }

  get outputs(): RecoverERC20Call__Outputs {
    return new RecoverERC20Call__Outputs(this);
  }
}

export class RecoverERC20Call__Inputs {
  _call: RecoverERC20Call;

  constructor(call: RecoverERC20Call) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RecoverERC20Call__Outputs {
  _call: RecoverERC20Call;

  constructor(call: RecoverERC20Call) {
    this._call = call;
  }
}

export class SetCuratorCall extends ethereum.Call {
  get inputs(): SetCuratorCall__Inputs {
    return new SetCuratorCall__Inputs(this);
  }

  get outputs(): SetCuratorCall__Outputs {
    return new SetCuratorCall__Outputs(this);
  }
}

export class SetCuratorCall__Inputs {
  _call: SetCuratorCall;

  constructor(call: SetCuratorCall) {
    this._call = call;
  }

  get _new_curator_address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetCuratorCall__Outputs {
  _call: SetCuratorCall;

  constructor(call: SetCuratorCall) {
    this._call = call;
  }
}

export class SetGaugeControllerCall extends ethereum.Call {
  get inputs(): SetGaugeControllerCall__Inputs {
    return new SetGaugeControllerCall__Inputs(this);
  }

  get outputs(): SetGaugeControllerCall__Outputs {
    return new SetGaugeControllerCall__Outputs(this);
  }
}

export class SetGaugeControllerCall__Inputs {
  _call: SetGaugeControllerCall;

  constructor(call: SetGaugeControllerCall) {
    this._call = call;
  }

  get _gauge_controller_address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetGaugeControllerCall__Outputs {
  _call: SetGaugeControllerCall;

  constructor(call: SetGaugeControllerCall) {
    this._call = call;
  }
}

export class SetGaugeStateCall extends ethereum.Call {
  get inputs(): SetGaugeStateCall__Inputs {
    return new SetGaugeStateCall__Inputs(this);
  }

  get outputs(): SetGaugeStateCall__Outputs {
    return new SetGaugeStateCall__Outputs(this);
  }
}

export class SetGaugeStateCall__Inputs {
  _call: SetGaugeStateCall;

  constructor(call: SetGaugeStateCall) {
    this._call = call;
  }

  get _gauge_address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _is_middleman(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get _is_active(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetGaugeStateCall__Outputs {
  _call: SetGaugeStateCall;

  constructor(call: SetGaugeStateCall) {
    this._call = call;
  }
}

export class SetGlobalEmissionRateCall extends ethereum.Call {
  get inputs(): SetGlobalEmissionRateCall__Inputs {
    return new SetGlobalEmissionRateCall__Inputs(this);
  }

  get outputs(): SetGlobalEmissionRateCall__Outputs {
    return new SetGlobalEmissionRateCall__Outputs(this);
  }
}

export class SetGlobalEmissionRateCall__Inputs {
  _call: SetGlobalEmissionRateCall;

  constructor(call: SetGlobalEmissionRateCall) {
    this._call = call;
  }

  get _global_emission_rate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetGlobalEmissionRateCall__Outputs {
  _call: SetGlobalEmissionRateCall;

  constructor(call: SetGlobalEmissionRateCall) {
    this._call = call;
  }
}

export class SetTimelockCall extends ethereum.Call {
  get inputs(): SetTimelockCall__Inputs {
    return new SetTimelockCall__Inputs(this);
  }

  get outputs(): SetTimelockCall__Outputs {
    return new SetTimelockCall__Outputs(this);
  }
}

export class SetTimelockCall__Inputs {
  _call: SetTimelockCall;

  constructor(call: SetTimelockCall) {
    this._call = call;
  }

  get _new_timelock(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetTimelockCall__Outputs {
  _call: SetTimelockCall;

  constructor(call: SetTimelockCall) {
    this._call = call;
  }
}

export class ToggleDistributionsCall extends ethereum.Call {
  get inputs(): ToggleDistributionsCall__Inputs {
    return new ToggleDistributionsCall__Inputs(this);
  }

  get outputs(): ToggleDistributionsCall__Outputs {
    return new ToggleDistributionsCall__Outputs(this);
  }
}

export class ToggleDistributionsCall__Inputs {
  _call: ToggleDistributionsCall;

  constructor(call: ToggleDistributionsCall) {
    this._call = call;
  }
}

export class ToggleDistributionsCall__Outputs {
  _call: ToggleDistributionsCall;

  constructor(call: ToggleDistributionsCall) {
    this._call = call;
  }
}
