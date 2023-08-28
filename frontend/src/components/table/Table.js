import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import "./Table.scss";

const table = ({
  dateAsc,
  transactions,
  editFormId,
  changeEditData,
  editData,
  updateNote,
  setEditFormId,
  setEditData,
  deleteTransaction,
  filterBy,
}) => {
  const sortByDate = (a, b) => {
    if (dateAsc) {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  };

  return (
    <div className="table-wrapper">
      <Table striped bordered hover bgcolor="white">
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th className="th-note">Note</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .sort(sortByDate)
            .filter((transaction) =>
              filterBy === "" ? transaction : transaction.category === filterBy
            )
            .map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.date.split("-").reverse().join(".")}</td>
                <td>
                  {item.isIncome ? (
                    <FaArrowAltCircleUp
                      style={{ color: "mediumseagreen", marginRight: 10 }}
                    />
                  ) : (
                    <FaArrowAltCircleDown
                      style={{ color: "lightcoral", marginRight: 10 }}
                    />
                  )}
                  {item.amount}€
                </td>
                {item.id === editFormId ? (
                  <td className="editField">
                    <input
                      type={"text"}
                      onChange={changeEditData}
                      value={editData}
                    ></input>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateNote(item.id, true)}
                    >
                      Ok
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => updateNote(item.id, false)}
                    >
                      Cancel
                    </Button>
                  </td>
                ) : (
                  <td className="note">
                    {item.note === "" ? "-" : item.note}
                    <button
                      onClick={() => {
                        setEditFormId(item.id);
                        setEditData(item.note);
                      }}
                    >
                      <span role="img" aria-label="edit">
                        ✏️
                      </span>
                    </button>
                  </td>
                )}
                <td className="deleteBtn">
                  <button onClick={() => deleteTransaction(item.id)}>
                    <span role="img" aria-label="delete">
                      ❌
                    </span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default table;
