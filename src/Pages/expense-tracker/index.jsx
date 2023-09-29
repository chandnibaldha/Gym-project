//import { collection } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebase.config";
import { useAddtransaction } from "../../hooks/useAddtransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddtransaction();
  const { transaction, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, income, expense } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("");
  };

  const Signout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name} Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expense">
              <h4>Expense</h4>
              <p>${expense}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="desc"
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <label htmlFor="expense" className="btn">
              Expense
            </label>
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income" className="btn">
              Income
            </label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <button type="submit" className="btn">
              Add Transaction
            </button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} alt="" />
            <button className="sign-out-button" onClick={Signout}>
              SignOut
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transaction</h3>
        <ul>
          {transaction.map((transactions, index) => {
            const { description, transactionAmount, transactionType } =
              transactions;
            return (
              <li key={index}>
                <h4>{description}</h4>
                <p>
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>{" "}
                  ${transactionAmount}
                </p>
                <p>{transactionType}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
