import { BigNumber, ethers } from 'ethers';

export const parseEthersDate = (date: BigNumber) => {
  const units = ethers.utils.formatUnits(date, 3);
  const secondsFromEpoch = parseFloat(units) * 1_000000;

  return new Date(secondsFromEpoch);
};
