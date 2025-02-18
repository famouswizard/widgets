import { alpha, Box, Button, useTheme, Tooltip } from '@dodoex/components';
import { PoolApi, PoolType } from '@dodoex/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  convertFetchLiquidityToOperateData,
  convertLiquidityTokenToTokenInfo,
  FetchMyLiquidityListLqList,
} from '../utils';
import { ChainId } from '@dodoex/api';
import React from 'react';
import { TokenLogoPair } from '../../../components/TokenLogoPair';
import { t, Trans } from '@lingui/macro';
import BigNumber from 'bignumber.js';
import {
  formatApy,
  formatExponentialNotation,
  formatReadableNumber,
} from '../../../utils';
import PoolApyTooltip from './components/PoolApyTooltip';
import { DataCardGroup } from '../../../components/DataCard/DataCardGroup';
import LoadingCard from './components/LoadingCard';
import { useWidgetDevice } from '../../../hooks/style/useWidgetDevice';
import { usePoolListFilterTokenAndPool } from './hooks/usePoolListFilterTokenAndPool';
import SelectChain from '../../../components/SelectChain';
import TokenAndPoolFilter from './components/TokenAndPoolFilter';
import TokenListPoolItem from './components/TokenListPoolItem';
import { EmptyList } from '../../../components/List/EmptyList';
import { FailedList } from '../../../components/List/FailedList';
import FilterAddressTags from './components/FilterAddressTags';
import FilterTokenTags from './components/FilterTokenTags';
import NeedConnectButton from '../../../components/ConnectWallet/NeedConnectButton';
import { PoolOperateProps } from '../PoolOperate';
import { useRouterStore } from '../../../router';
import { PageType } from '../../../router/types';
import { AddressWithLinkAndCopy } from '../../../components/AddressWithLinkAndCopy';
import { OperateTab } from '../PoolOperate/hooks/usePoolOperateTabs';
import TokenLogo from '../../../components/TokenLogo';
import AddingOrRemovingBtn from './components/AddingOrRemovingBtn';
import LiquidityTable from './components/LiquidityTable';
import { useUserOptions } from '../../../components/UserOptionsProvider';
import { useGraphQLRequests } from '../../../hooks/useGraphQLRequests';
import { CardStatus } from '../../../components/CardWidgets';
import LiquidityLpPartnerReward from '../../../components/LiquidityLpPartnerReward';

function CardList({
  account,
  lqList,
  setOperatePool,
}: {
  account?: string;
  lqList: FetchMyLiquidityListLqList;
  setOperatePool: (operate: Partial<PoolOperateProps> | null) => void;
}) {
  const theme = useTheme();
  return (
    <>
      {lqList?.map((lq) => {
        if (!lq?.pair) return null;
        const item = lq.pair;
        const baseToken = convertLiquidityTokenToTokenInfo(
          item.baseToken,
          item.chainId,
        );
        const quoteToken = convertLiquidityTokenToTokenInfo(
          item.quoteToken,
          item.chainId,
        );
        const singleSideLp = PoolApi.utils.singleSideLp(item.type as PoolType);
        const baseApy = item.apy
          ? formatApy(
              new BigNumber(item.apy?.transactionBaseApy).plus(
                item.apy?.miningBaseApy ?? 0,
              ),
            )
          : undefined;
        const quoteApy =
          singleSideLp && item.apy
            ? formatApy(
                new BigNumber(item.apy.transactionQuoteApy).plus(
                  item.apy.miningQuoteApy ?? 0,
                ),
              )
            : undefined;

        let baseLpTokenBalance: BigNumber | undefined;
        let quoteLpTokenBalance: BigNumber | undefined;
        if (lq.liquidityPositions?.length) {
          lq.liquidityPositions.forEach((position) => {
            if (position?.liquidityTokenBalance) {
              const idArray = position.id?.split('-');
              if (idArray?.length === 2) {
                const positionLpTokenAddressLow =
                  idArray[1].toLocaleLowerCase();
                if (
                  item?.baseLpToken?.id?.toLocaleLowerCase() ===
                  positionLpTokenAddressLow
                ) {
                  baseLpTokenBalance = new BigNumber(
                    position.liquidityTokenBalance,
                  );
                  return;
                }
                if (
                  item?.quoteLpToken?.id?.toLocaleLowerCase() ===
                  positionLpTokenAddressLow
                ) {
                  quoteLpTokenBalance = new BigNumber(
                    position.liquidityTokenBalance,
                  );
                }
              }
            }
          });
        }
        const hasMining = !!item.miningAddress?.[0];
        return (
          <Box
            key={item.id + item.chainId}
            sx={{
              px: 20,
              pt: 20,
              pb: 12,
              backgroundColor: 'background.paper',
              borderRadius: 16,
            }}
            onClick={() => {
              useRouterStore.getState().push({
                type: PageType.PoolDetail,
                params: {
                  chainId: item.chainId as ChainId,
                  address: item.id as string,
                },
              });
            }}
          >
            {/* title */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {baseToken && quoteToken ? (
                  <TokenLogoPair
                    tokens={[baseToken, quoteToken]}
                    width={24}
                    mr={6}
                    chainId={item.chainId}
                    showChainLogo
                  />
                ) : (
                  ''
                )}
                <Box
                  sx={{
                    typography: 'body2',
                    fontWeight: 600,
                  }}
                >
                  {`${baseToken?.symbol}/${quoteToken?.symbol}`}
                  <LiquidityLpPartnerReward
                    address={item.id}
                    chainId={item.chainId}
                  />
                </Box>
              </Box>
              {hasMining ? (
                <Box
                  sx={{
                    p: 8,
                    typography: 'h6',
                    fontWeight: 'bold',
                    background: `linear-gradient(180deg, ${alpha(
                      theme.palette.secondary.main,
                      0.3,
                    )} 0%, ${alpha(theme.palette.purple.main, 0.3)} 100%)`,
                    borderRadius: 8,
                    color: 'purple.main',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ✨ <Trans>Mining</Trans>
                </Box>
              ) : (
                ''
              )}
            </Box>
            {/* info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 44,
              }}
            >
              <Box>
                <Box
                  sx={{
                    typography: 'h5',
                  }}
                >
                  {baseApy}
                  {quoteApy ? `/${quoteApy}` : ''}
                </Box>
                <Box
                  sx={{
                    typography: 'h6',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                  }}
                >
                  <Trans>APY</Trans>
                  <PoolApyTooltip
                    chainId={item.chainId}
                    apy={item.apy}
                    baseToken={baseToken}
                    quoteToken={quoteToken}
                    hasQuote={!!quoteApy}
                    hasMining={hasMining}
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'inline-block',
                  mx: 20,
                  height: 24,
                  width: '1px',
                  backgroundColor: 'custom.border.default',
                }}
              />
              <Box>
                <Box
                  sx={{
                    typography: 'h5',
                  }}
                >
                  ${formatExponentialNotation(new BigNumber(item.tvl))}
                </Box>
                <Box
                  sx={{
                    typography: 'h6',
                    color: 'text.secondary',
                  }}
                >
                  <Trans>TVL</Trans>
                </Box>
              </Box>
            </Box>
            {/* my liquidity */}
            <Box>
              <Box
                sx={{
                  mt: 12,
                  typography: 'h5',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                {singleSideLp ? (
                  <TokenLogo
                    address={baseToken?.address}
                    chainId={item.chainId}
                    url={baseToken?.logoURI}
                    width={18}
                    height={18}
                    sx={{
                      mr: 4,
                    }}
                  />
                ) : (
                  <TokenLogoPair
                    tokens={
                      baseToken && quoteToken ? [baseToken, quoteToken] : []
                    }
                    width={18}
                    mr={4}
                    showChainLogo={false}
                    chainId={item.chainId}
                  />
                )}
                {baseLpTokenBalance
                  ? formatReadableNumber({
                      input: baseLpTokenBalance,
                    })
                  : ''}
                {singleSideLp && (
                  <>
                    {' / '}
                    <TokenLogo
                      address={quoteToken?.address}
                      chainId={item.chainId}
                      url={quoteToken?.logoURI}
                      width={18}
                      height={18}
                      sx={{
                        mx: 4,
                      }}
                    />
                    {quoteLpTokenBalance
                      ? formatReadableNumber({
                          input: quoteLpTokenBalance,
                        })
                      : '0'}
                  </>
                )}
              </Box>
              <Box
                sx={{
                  typography: 'h6',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <Trans>My Liquidity</Trans>
              </Box>
            </Box>
            {/* operate */}
            <Box
              sx={{
                mt: 20,
                display: 'flex',
                gap: '8px',
              }}
            >
              {!!account && (
                <NeedConnectButton
                  fullWidth
                  variant={Button.Variant.outlined}
                  size={Button.Size.small}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    setOperatePool({
                      operate: OperateTab.Remove,
                      pool: convertFetchLiquidityToOperateData(lq),
                      hasMining,
                    });
                  }}
                >
                  <Trans>Remove</Trans>
                </NeedConnectButton>
              )}
              <NeedConnectButton
                fullWidth
                size={Button.Size.small}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setOperatePool({
                    operate: OperateTab.Add,
                    pool: convertFetchLiquidityToOperateData(lq),
                    hasMining,
                  });
                }}
              >
                <Trans>Add</Trans>
              </NeedConnectButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

function TableList({
  account,
  lqList,
  operatePool,
  setOperatePool,
}: {
  account?: string;
  lqList: FetchMyLiquidityListLqList;
  operatePool: Partial<PoolOperateProps> | null;
  setOperatePool: (operate: Partial<PoolOperateProps> | null) => void;
}) {
  return (
    <LiquidityTable>
      <Box component="thead">
        <Box component="tr">
          <Box component="th">
            <Trans>Pair</Trans>
          </Box>
          <Box component="th">
            <Trans>TVL</Trans>
          </Box>
          <Box component="th">
            <Trans>My Liquidity</Trans>
          </Box>
          <Box component="th">
            <Trans>APY</Trans>
          </Box>
          <Box
            component="th"
            sx={{
              width: 160,
            }}
          ></Box>
        </Box>
      </Box>
      <Box component="tbody">
        {lqList?.map((lq) => {
          if (!lq?.pair) return null;
          const item = lq.pair;
          const baseToken = convertLiquidityTokenToTokenInfo(
            item.baseToken,
            item.chainId,
          );
          const quoteToken = convertLiquidityTokenToTokenInfo(
            item.quoteToken,
            item.chainId,
          );
          const singleSideLp = PoolApi.utils.singleSideLp(
            item.type as PoolType,
          );
          const baseApy = item.apy
            ? formatApy(
                new BigNumber(item.apy?.transactionBaseApy).plus(
                  item.apy?.miningBaseApy ?? 0,
                ),
              )
            : undefined;
          const quoteApy =
            singleSideLp && item.apy
              ? formatApy(
                  new BigNumber(item.apy.transactionQuoteApy).plus(
                    item.apy.miningQuoteApy ?? 0,
                  ),
                )
              : undefined;

          let baseLpTokenBalance: BigNumber | undefined;
          let quoteLpTokenBalance: BigNumber | undefined;
          if (lq.liquidityPositions?.length) {
            lq.liquidityPositions.forEach((position) => {
              if (position?.liquidityTokenBalance) {
                const idArray = position.id?.split('-');
                if (idArray?.length === 2) {
                  const positionLpTokenAddressLow =
                    idArray[1].toLocaleLowerCase();
                  if (
                    item?.baseLpToken?.id?.toLocaleLowerCase() ===
                    positionLpTokenAddressLow
                  ) {
                    baseLpTokenBalance = new BigNumber(
                      position.liquidityTokenBalance,
                    );
                    return;
                  }
                  if (
                    item?.quoteLpToken?.id?.toLocaleLowerCase() ===
                    positionLpTokenAddressLow
                  ) {
                    quoteLpTokenBalance = new BigNumber(
                      position.liquidityTokenBalance,
                    );
                  }
                }
              }
            });
          }

          let operateBtnText = '';
          if (
            operatePool?.pool?.address === item.id ||
            operatePool?.address === item.id
          ) {
            switch (operatePool.operate) {
              case OperateTab.Remove:
                operateBtnText = t`Removing`;
                break;
              default:
                operateBtnText = t`Adding`;
                break;
            }
          }
          const hasMining = !!item.miningAddress?.[0];

          return (
            <Box component="tr" key={item.id + item.chainId}>
              <Box component="td">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {baseToken && quoteToken ? (
                    <TokenLogoPair
                      tokens={[baseToken, quoteToken]}
                      width={24}
                      mr={10}
                      chainId={item.chainId}
                      showChainLogo
                    />
                  ) : (
                    ''
                  )}
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        typography: 'body2',
                        fontWeight: 600,
                      }}
                    >
                      {`${baseToken?.symbol}/${quoteToken?.symbol}`}
                      <LiquidityLpPartnerReward
                        address={item.id}
                        chainId={item.chainId}
                      />
                    </Box>
                    <AddressWithLinkAndCopy
                      address={item.id}
                      customChainId={item.chainId}
                      truncate
                      showCopy
                      iconDarkHover
                      iconSize={14}
                      iconSpace={4}
                      onAddressClick={() => {
                        useRouterStore.getState().push({
                          type: PageType.PoolDetail,
                          params: {
                            chainId: item.chainId as ChainId,
                            address: item.id as string,
                          },
                        });
                      }}
                      sx={{
                        typography: 'h6',
                        color: 'text.secondary',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box component="td">
                <Box
                  sx={{
                    typography: 'body2',
                  }}
                  title={
                    item.tvl
                      ? `$${formatReadableNumber({
                          input: item.tvl,
                        })}`
                      : undefined
                  }
                >
                  ${formatExponentialNotation(new BigNumber(item.tvl))}
                </Box>
              </Box>
              <Box component="td">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {singleSideLp ? (
                    <TokenLogo
                      address={baseToken?.address}
                      chainId={item.chainId}
                      url={baseToken?.logoURI}
                      width={24}
                      height={24}
                      noShowChain
                      sx={{
                        mr: 4,
                      }}
                    />
                  ) : (
                    <TokenLogoPair
                      tokens={
                        baseToken && quoteToken ? [baseToken, quoteToken] : []
                      }
                      width={24}
                      mr={4}
                      showChainLogo={false}
                      chainId={item.chainId}
                    />
                  )}
                  {baseLpTokenBalance
                    ? formatReadableNumber({
                        input: baseLpTokenBalance,
                      })
                    : '-'}
                  {singleSideLp && (
                    <>
                      {' / '}
                      <TokenLogo
                        address={quoteToken?.address}
                        chainId={item.chainId}
                        url={quoteToken?.logoURI}
                        width={24}
                        height={24}
                        noShowChain
                        sx={{
                          mx: 4,
                        }}
                      />
                      {quoteLpTokenBalance
                        ? formatReadableNumber({
                            input: quoteLpTokenBalance,
                          })
                        : '0'}
                    </>
                  )}
                </Box>
              </Box>
              <Box component="td">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {hasMining ? (
                    <Tooltip title={t`Mining`}>
                      <Box
                        component="span"
                        sx={{
                          typography: 'body2',
                          color: 'success.main',
                        }}
                      >
                        ✨{' '}
                      </Box>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  <PoolApyTooltip
                    chainId={item.chainId}
                    apy={item.apy}
                    baseToken={baseToken}
                    quoteToken={quoteToken}
                    hasQuote={!!quoteApy}
                    hasMining={hasMining}
                  >
                    <Box
                      component="span"
                      sx={{
                        typography: 'body2',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        width: 'max-content',
                        color: 'success.main',
                        cursor: 'auto',
                      }}
                    >
                      {baseApy}
                      {quoteApy ? `/${quoteApy}` : ''}
                    </Box>
                  </PoolApyTooltip>
                </Box>
              </Box>
              <Box component="td">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '8px',
                  }}
                >
                  {operateBtnText ? (
                    <AddingOrRemovingBtn
                      text={operateBtnText}
                      onClick={() => setOperatePool(null)}
                    />
                  ) : (
                    <>
                      {!!account && (
                        <NeedConnectButton
                          variant={Button.Variant.outlined}
                          size={Button.Size.small}
                          onClick={(evt) => {
                            evt.stopPropagation();
                            setOperatePool({
                              operate: OperateTab.Remove,
                              pool: convertFetchLiquidityToOperateData(lq),
                              hasMining,
                            });
                          }}
                        >
                          <Trans>Remove</Trans>
                        </NeedConnectButton>
                      )}
                      <NeedConnectButton
                        size={Button.Size.small}
                        onClick={() => {
                          setOperatePool({
                            pool: convertFetchLiquidityToOperateData(lq),
                            hasMining,
                          });
                        }}
                      >
                        {t`Add`}
                      </NeedConnectButton>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </LiquidityTable>
  );
}

export default function MyLiquidity({
  account,
  filterChainIds,
  activeChainId,
  handleChangeActiveChainId,
  operatePool,
  setOperatePool,
}: {
  account?: string;
  filterChainIds?: ChainId[];

  activeChainId: ChainId | undefined;
  handleChangeActiveChainId: (chainId: number | undefined) => void;
  operatePool: Partial<PoolOperateProps> | null;
  setOperatePool: (operate: Partial<PoolOperateProps> | null) => void;
}) {
  const theme = useTheme();
  const { minDevice, isMobile } = useWidgetDevice();
  const queryClient = useQueryClient();
  const { onlyChainId } = useUserOptions();

  const {
    filterTokens,
    filterASymbol,
    filterBSymbol,
    filterAddressLqList,

    handleDeleteToken,
    handleChangeFilterTokens,
    handleChangeFilterAddress,
  } = usePoolListFilterTokenAndPool();

  const defaultQueryFilter = {
    currentPage: 1,
    pageSize: 1000,
    user: account,
    filterState: {
      viewOnlyOwn: true,
    },
  };

  const graphQLRequests = useGraphQLRequests();
  const query = graphQLRequests.getQuery(PoolApi.graphql.fetchMyLiquidityList, {
    where: {
      ...defaultQueryFilter,
      filterState: {
        filterASymbol,
        filterBSymbol,
        ...defaultQueryFilter.filterState,
      },
    },
  });
  const fetchResult = useQuery({
    ...query,
  });

  let lqList = fetchResult.data?.liquidity_list?.lqList ?? [];
  const hasFilterAddress = !!filterAddressLqList?.length;
  if (hasFilterAddress) {
    lqList = [...filterAddressLqList];
  } else if (filterChainIds) {
    lqList =
      fetchResult.data?.liquidity_list?.lqList?.filter((lq) =>
        filterChainIds.includes(lq?.pair?.chainId ?? 0),
      ) ?? [];
  }

  const filterSmallDeviceWidth = 475;

  return (
    <>
      <Box
        sx={{
          py: 16,
          display: 'flex',
          gap: 8,
          ...(minDevice(filterSmallDeviceWidth)
            ? {}
            : {
                flexDirection: 'column',
              }),
          ...(isMobile
            ? {}
            : {
                px: 20,
                borderBottomWidth: 1,
              }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            ...(minDevice(filterSmallDeviceWidth)
              ? {}
              : {
                  '& > button': {
                    flex: 1,
                  },
                }),
          }}
        >
          {!onlyChainId && (
            <SelectChain
              chainId={activeChainId}
              setChainId={handleChangeActiveChainId}
            />
          )}
          <TokenAndPoolFilter
            value={filterTokens}
            onChange={handleChangeFilterTokens}
            searchAddress={async (address, onClose) => {
              const query = graphQLRequests.getInfiniteQuery(
                PoolApi.graphql.fetchLiquidityList,
                'currentPage',
                {
                  where: {
                    ...defaultQueryFilter,
                    filterState: {
                      address,
                      ...defaultQueryFilter.filterState,
                    },
                  },
                },
              );
              const result = await queryClient.fetchQuery(query);
              const lqList = result.liquidity_list?.lqList;
              if (lqList?.length) {
                return (
                  <TokenListPoolItem
                    list={lqList}
                    onClick={() => {
                      handleChangeFilterAddress(lqList);
                      onClose();
                    }}
                  />
                );
              }
              return null;
            }}
          />
        </Box>

        {/* filter tag */}
        {(hasFilterAddress || !!filterTokens.length) && (
          <Box
            sx={{
              my: 0,
            }}
          >
            {hasFilterAddress ? (
              <FilterAddressTags
                lqList={filterAddressLqList}
                onDeleteTag={() => handleChangeFilterAddress([])}
              />
            ) : (
              ''
            )}
            <FilterTokenTags
              tags={filterTokens}
              onDeleteTag={handleDeleteToken}
            />
          </Box>
        )}
      </Box>

      {/* list */}
      {isMobile ? (
        <DataCardGroup>
          {fetchResult.isLoading ? <LoadingCard /> : ''}
          {!fetchResult.isLoading && !lqList?.length && !fetchResult.error && (
            <EmptyList
              sx={{
                mt: 40,
              }}
              hasSearch={
                !!(
                  (activeChainId && !onlyChainId) ||
                  filterASymbol ||
                  filterBSymbol
                )
              }
            />
          )}
          {!!fetchResult.error && (
            <FailedList
              refresh={fetchResult.refetch}
              sx={{
                mt: 40,
              }}
            />
          )}
          <CardList
            account={account}
            lqList={lqList}
            setOperatePool={setOperatePool}
          />
        </DataCardGroup>
      ) : (
        <>
          <TableList
            account={account}
            lqList={lqList}
            operatePool={operatePool}
            setOperatePool={setOperatePool}
          />

          <CardStatus
            loading={fetchResult.isLoading}
            refetch={fetchResult.error ? fetchResult.refetch : undefined}
            empty={!lqList?.length}
            hasSearch={
              !!(
                (activeChainId && !onlyChainId) ||
                filterASymbol ||
                filterBSymbol
              )
            }
          />
        </>
      )}
    </>
  );
}
