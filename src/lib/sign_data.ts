import { CHAINS } from "../constants";
import { getWalletClient } from "./viem";

const signPaymentData = async ({ crayOrder, allowanceData, limitOrderTypedData, sltpOrderTypedData, sellTypedData }) => {
  const walletClient = await getWalletClient();
  const signedOrder = crayOrder && await walletClient.signTypedData(crayOrder);
  const signedSellOrder = sellTypedData && await walletClient.signTypedData(sellTypedData);
  const signedLimitOrder = limitOrderTypedData && await walletClient.signTypedData(limitOrderTypedData);
  const signedSltpOrder = sltpOrderTypedData
    ? await Promise.all(
        Array.from(sltpOrderTypedData).map(async (data) => {
          const entries = await Promise.all(
            Object.entries(data).map(async ([key, value]) => {
              const signature = await walletClient.signTypedData(value);
              return [key, signature];
            })
          );
          return Object.fromEntries(entries);
        })
      )
    : undefined;
 
  const signedApprovalData = [];
  for (let i = 0; i < allowanceData?.length; i++) {
    const data = allowanceData[i];
    const chainId = data.domainData.chainId as number;
    const walletClient = await getWalletClient(CHAINS[chainId]);
    const signature = await walletClient.signTypedData({
      types: data.types,
      domain: data.domainData,
      message: data.values,
      primaryType: "Permit",
    } as any);
    signedApprovalData.push({
      r: signature.slice(0, 66),
      s: "0x" + signature.slice(66, 130),
      v: "0x" + signature.slice(130, 132),
      chainId: data.domainData.chainId,
      verifyingContract: data.domainData.verifyingContract,
      walletAddress: walletClient.account.address,
      value: data.values.value,
      deadline: data.values.deadline,
    });
  }

  return { signedOrder, signedApprovalData, signedLimitOrder, signedSltpOrder, signedSellOrder };
};
export default signPaymentData;
