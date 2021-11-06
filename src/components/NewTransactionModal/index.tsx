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
import { api } from "../../services/api";

Modal.setAppElement("#root");

interface NewTransactionModalProp {
  isModalOpen: boolean;
  onCloseNewTransactionModal: () => void;
}

export function NewTransactionModal({
  isModalOpen,
  onCloseNewTransactionModal,
}: NewTransactionModalProp) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post("/transactions", data).then((res) => console.log(res.data));
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
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
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
