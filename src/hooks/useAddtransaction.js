import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/firebase.config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useAddtransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
