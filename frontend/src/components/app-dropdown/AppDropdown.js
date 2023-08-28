import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function AppDropdown({ transactionsData, changeFilterBy }) {
  const unique = [...new Set(transactionsData.map((item) => item.category))];

  return (
    <DropdownButton id="dropdown-basic-button" title="Filter by">
      <Dropdown.Item as="button" onClick={() => changeFilterBy("")}>
        Don't filter
      </Dropdown.Item>
      <Dropdown.Divider />
      {unique.map((item) => (
        <Dropdown.Item
          as="button"
          onClick={() => changeFilterBy(item)}
          key={item}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default AppDropdown;
