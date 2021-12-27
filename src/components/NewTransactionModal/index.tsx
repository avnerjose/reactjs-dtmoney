import { FormEvent, useState } from "react";
import Modal from "react-modal";
import {
  Container,
  RadioBox,
  SubmitButton,
  TransactionTypeContainer,
} from "./styles";
import closeIcon from "../../assets/close.svg";
import incomeIcon from "../../assets/income.svg";
import outcomeIcon from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

Modal.setAppElement("#root");

interface NewTransactionModalProp {
  isModalOpen: boolean;
  onCloseNewTransactionModal: () => void;
}

export function NewTransactionModal({
  isModalOpen,
  onCloseNewTransactionModal,
}: NewTransactionModalProp) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({ amount, category, title, type });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    onCloseNewTransactionModal();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onCloseNewTransactionModal}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={({ target }) => setAmount(Number(target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeIcon} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeIcon} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          type="text"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        />

        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </Container>
    </Modal>
  );
}
