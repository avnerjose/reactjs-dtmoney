import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions();
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map(
            ({ id, amount, category, createdAt, title, type }) => {
              return (
                <tr key={id} className={type}>
                  <td>{title}</td>
                  <td className={type}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(amount)}
                  </td>
                  <td>{category}</td>
                  <td>
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(createdAt)
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Container>
  );
}
