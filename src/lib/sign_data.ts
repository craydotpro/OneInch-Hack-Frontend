import { CHAINS } from "../constants";
import { getWalletClient } from "./viem";

const signPaymentData = async (crayOrder: any, allowanceData = [] as any[]) => {
  const walletClient = await getWalletClient();
  const signedOrder = await walletClient.signTypedData(crayOrder);
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

  return { signedOrder, signedApprovalData };
};
export default signPaymentData;
