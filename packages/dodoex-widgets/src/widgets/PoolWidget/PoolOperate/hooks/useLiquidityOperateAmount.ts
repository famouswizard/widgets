import { PoolApi, PoolType } from '@dodoex/api';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React from 'react';
import { fixedInputStringToFormattedNumber } from '../../../../utils/formatter';
import { poolApi } from '../../utils';
import { OperatePool } from '../types';

export function useLiquidityOperateAmount({
  pool,
  maxBaseAmount,
  maxQuoteAmount,
  isRemove,
}: {
  pool: OperatePool;
  maxBaseAmount?: BigNumber | null;
  maxQuoteAmount?: BigNumber | null;
  isRemove?: boolean;
}) {
  const [baseAmount, setBaseAmount] = React.useState('');
  const [quoteAmount, setQuoteAmount] = React.useState('');
  const pmmStateQuery = useQuery(
    poolApi.getPMMStateQuery(
      pool?.chainId as number,
      pool?.address,
      pool?.type,
      pool?.baseToken?.decimals,
      pool?.quoteToken?.decimals,
    ),
  );

  const reset = () => {
    setBaseAmount('');
    setQuoteAmount('');
  };

  let addPortion = new BigNumber(1);
  let isSinglePool = false;
  let isEmptyDspPool = false;
  const pmm = pmmStateQuery.data;
  if (pool && pmm) {
    const i = pmm.pmmParamsBG.i;
    const baseReserve = pmm.pmmParamsBG.b;
    const quoteReserve = pmm.pmmParamsBG.q;
    isEmptyDspPool =
      (pool.type === 'DSP' || pool.type === 'GSP') &&
      (quoteReserve.eq(0) || baseReserve.eq(0));
    isSinglePool = pool.type === 'DVM' && new BigNumber(quoteReserve).eq(0);
    if (isEmptyDspPool) {
      addPortion = i;
    } else if (isSinglePool) {
      addPortion = BigNumber(1);
    } else {
      addPortion = quoteReserve.div(baseReserve);
    }
  }

  const prevAddPortion = React.useRef(addPortion);

  if (!pool || !pmm)
    return {
      baseAmount,
      quoteAmount,
      handleChangeBaseAmount: () => {},
      handleChangeQuoteAmount: () => {},
      reset,
    };

  const needBindAmountChange =
    !isSinglePool && !PoolApi.utils.singleSideLp(pool.type);
  const baseDecimals = pool.baseToken.decimals;
  const quoteDecimals = pool.quoteToken.decimals;

  const changeQuoteByBaseAmount = (amount: string) => {
    if (amount) {
      let matchQuoteAmount = addPortion
        .multipliedBy(amount)
        .dp(quoteDecimals)
        .toString();
      if (
        maxQuoteAmount &&
        isRemove &&
        (maxQuoteAmount.lte(matchQuoteAmount) || maxBaseAmount?.lte(0))
      ) {
        matchQuoteAmount = maxQuoteAmount.toString();
      }
      setQuoteAmount(matchQuoteAmount);
    } else {
      setQuoteAmount(amount);
    }
  };

  const changeBaseByQuoteAmount = (amount: string) => {
    if (amount) {
      let matchBaseAmount = new BigNumber(amount)
        .div(addPortion)
        .dp(baseDecimals)
        .toString();
      if (
        maxBaseAmount &&
        isRemove &&
        (maxBaseAmount.lte(matchBaseAmount) || maxQuoteAmount?.lte(0))
      ) {
        matchBaseAmount = maxBaseAmount.toString();
      }
      setBaseAmount(matchBaseAmount);
    } else {
      setBaseAmount(amount);
    }
  };

  // After the data on the chain changes, change quoteAmount
  if (
    needBindAmountChange &&
    (!prevAddPortion.current || !addPortion.isEqualTo(prevAddPortion.current))
  ) {
    prevAddPortion.current = addPortion;
    changeQuoteByBaseAmount(baseAmount);
  }

  const handleChangeBaseAmount = (newValue: string) => {
    let amount = fixedInputStringToFormattedNumber(newValue, baseDecimals);
    if (amount === null) {
      amount = baseAmount;
    }
    setBaseAmount(amount);
    if (needBindAmountChange) {
      changeQuoteByBaseAmount(amount);
    }
  };

  const handleChangeQuoteAmount = (newValue: string) => {
    let amount = fixedInputStringToFormattedNumber(newValue, quoteDecimals);
    if (amount === null) {
      amount = quoteAmount;
    }
    setQuoteAmount(amount);
    if (needBindAmountChange) {
      changeBaseByQuoteAmount(amount);
    }
  };

  const isSingleSideLp = !!pool && PoolApi.utils.singleSideLp(pool.type);
  let amountCheckedDisabled = false;
  if (isSingleSideLp) {
    amountCheckedDisabled = !baseAmount && !quoteAmount;
  } else if (isSinglePool) {
    amountCheckedDisabled = !baseAmount;
  } else {
    amountCheckedDisabled = !baseAmount || !quoteAmount;
  }

  return {
    baseAmount,
    quoteAmount,
    handleChangeBaseAmount,
    handleChangeQuoteAmount,
    reset,

    addPortion,
    amountLoading: pmmStateQuery.isLoading,
    amountError: pmmStateQuery.isError,
    amountRefetch: pmmStateQuery.refetch,
    amountCheckedDisabled,

    midPrice: pmmStateQuery.data?.midPrice,
  };
}
