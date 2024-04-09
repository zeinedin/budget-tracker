import { useState } from 'react';
import logoBudget from './icons/account_balance_wallet.svg';
import logoSpentThisMonth from './icons/currency_exchange.svg';
import logoAdd from './icons/add_card.svg';
import logoTransactions from './icons/mingcute_card-pay-fill.svg';
import logo from './icons/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faGlobe, faHamburger, faHouse, faPlane, faShirt } from '@fortawesome/free-solid-svg-icons'

const food = <FontAwesomeIcon icon={faHamburger} />
const rent = <FontAwesomeIcon icon={faHouse} />
const travel = <FontAwesomeIcon icon={faPlane} />
const internet = <FontAwesomeIcon icon={faGlobe} />
const car = <FontAwesomeIcon icon={faCar} />
const cloth = <FontAwesomeIcon icon={faShirt} />




const transactions = [
  {
    "id": 789043,
    "name": "Apples",
    "amount": 50,
    "date": "2024-04-09",
    "category": "Food"
  },
  {
    "id": 234567,
    "name": "Flight ticket",
    "amount": 25,
    "date": "2024-04-08",
    "category": "Travel"
  },
  {
    "id": 890123,
    "name": "Gasoline",
    "amount": 100,
    "date": "2024-04-07",
    "category": "Car&Gas"
  },
  {
    "id": 123456,
    "name": "Internet subscription",
    "amount": 75,
    "date": "2024-04-06",
    "category": "Internet"
  },
  {
    "id": 567890,
    "name": "Rent payment",
    "amount": 120,
    "date": "2024-04-05",
    "category": "Rent"
  }
]


function Button({ children, type, onClick }) {
  return (
    <button type={type || "button"} className="btn btn-secondary" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const [budget, setBudget] = useState(700);
  const [items, setItems] = useState(transactions);
  const [amountThisMonth, setAmountThisMonth] = useState(items.reduce((acc, item) => acc + item.amount, 0));
  function onChange() {
    setAmountThisMonth(items.reduce((acc, item) => acc + item.amount, 0))
  }
  function handelAddTransaction(newItem) {
    setItems(items => [...items, newItem])
    setAmountThisMonth(items.reduce((acc, item) => acc + item.amount, 0))
  }
  function handelDelete(id) {
    setItems(items.filter(item => item.id !== id));
  }
  return (
    <div className="App">
      <header className="App-header container">
        <Header />
        <BudgetTracker items={items} budget={budget} setBudget={setBudget} amountThisMonth={amountThisMonth} onChange={onChange} />
        <AddTransactions onChange={onChange} image={logoAdd} items={items} setItems={setItems} onAdd={handelAddTransaction} />
        <Transactions image={logoTransactions} items={items} onDelete={handelDelete} />
        <Footer />
      </header>
    </div>
  );
}

function Header() {
  return (
    <header className='navbar navbar-expand-lg bg-body-tertiary fixed-top'>
      <div className='container-fluid'>
        <img src={logo} alt="Logo" className='navbar-brand' />
        <h2 className='navbar'>Budget Tracker</h2>
        <h3 className='navbar-brand'>{ }</h3>
      </div>
    </header>
  )
}
function BudgetTracker({ budget, setBudget, amountThisMonth, onChange }) {
  const [isClicked, setIsClicked] = useState(false);
  function handelClick() {
    setIsClicked(!isClicked);
  }
  return (
    <div className='budget-trackers-main row row-cols-2 row-cols-md-2 g-4' style={{ marginTop: 150 }}>

      <BudgetTrackerCard image={logoSpentThisMonth}>
        <h4 className='card-text mb-5' style={amountThisMonth < budget ? { color: 'green' } : { color: 'red' }}>Amount Spent This Month: €{amountThisMonth}</h4>
      </BudgetTrackerCard>
      <BudgetTrackerCard image={logoBudget}>
        <h4 className='card-text'>Assigned Budget: €{budget}</h4>
        {isClicked && <input value={budget} onChange={(e) => setBudget(Number(e.target.value))} />}
        <button className='button-change-budget btn btn-secondary' onClick={handelClick}> {!isClicked ? "Change Budget" : "Save"}</button>
      </BudgetTrackerCard>
    </div>
  )
}
function BudgetTrackerCard({ children, image }) {
  return (
    <div className='col'>
      <div className='budget-tracker card tex-center'>
        <div className='card-body'>
          <div className='card-header'>
            <img src={image} alt="trackerLogo" className='card-img-top' style={{ maxHeight: 200 }} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

function AddTransactions({ image, items, setItems, onAdd, onChange }) {
  const [isClicked, setIsClicked] = useState(false);
  function handelClick() {
    setIsClicked(!isClicked);
  }
  return (
    <div className='add-transactions'>
      <div className='hstack gap-3 mt-5'>
        <img src={image} alt="trackerLogo" />
        <h2>Add Transactions To Track</h2>{isClicked && <Button onClick={handelClick}>Add Transaction</Button>}
      </div>
      {!isClicked && <FormAddTransactions onChange={onChange} onAdd={onAdd} isClicked={isClicked} setIsClicked={setIsClicked} items={items} setItems={setItems} />}

    </div>
  )
}
function FormAddTransactions({ isClicked, setIsClicked, onAdd, onChange }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Food");
  const date = new Date().toLocaleDateString();
  const id = crypto.randomUUID();
  function handelClose() {
    setIsClicked(!isClicked);
  }

  function handelSubmit(e) {
    e.preventDefault();
    const newItem = {
      id,
      name,
      amount,
      date,
      category,
    }
    if (!name || !amount) return;

    onAdd(newItem);
    setName("");
    setAmount(0);
    setCategory("Food");
    onChange();

  }
  const type = "submit";
  return (
    <div className='form-transaction'>
      <form className='container' style={{ maxWidth: 900 }} onSubmit={(e) => handelSubmit(e)} >
        <label className='form-label'>Name</label>
        <input type="text" className='form-control' placeholder='Enter what you bought here' value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label className='form-label'>Amount</label>
        <input className='form-control' type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /><br />
        <label className='form-label'>Catagory</label>
        <select name="category" className='form-select mb-2' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Car&Gas">Car&Gas</option>
          <option value="Internet">Internet</option>
          <option value="Rent">Rent</option>
          <option value="Clothes">Clothes</option>
        </select>
        <Button type={type}>Add</Button>{" "}
        <Button onClick={handelClose}>Close</Button>{" "}
      </form>
    </div>
  )

}
function Transactions({ image, items, onDelete }) {
  return (
    <div className='transactions'>
      <div className='hstack gap-3 mt-4'>
        <img src={image} alt="trackerLogo" />
        <h2>Transactions</h2>
      </div>
      <table className="transaction-table table">
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Date</th>
            <th scope='col'>category</th>
            <th scope='col'>action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {items.map((item, index) => (< TransactionItem onDelete={onDelete} item={item} key={item.name} num={index} />))}
        </tbody>
      </table>
    </div>

  )
}

function TransactionItem({ item, num, onDelete }) {

  const { name, amount, category } = item;
  return (
    <tr>
      <th scope='row'>{num + 1}</th>
      <td>{name}</td>
      <td>€ {amount}</td>
      <td>{item.date}</td>
      <td>{category === 'Clothes' ? cloth : category === 'Food' ? food : category === 'Travel' ? travel : category === 'Car&Gas' ? car : category === 'Internet' ? internet : category === 'Rent' ? rent : ""} {" "}
        {category}</td>
      <td>
        <Button onClick={() => onDelete(item.id)}>Delete</Button></td>
    </tr >
  )
}
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      &copy; {year} Budget Tracker. All rights reserved.
    </footer>
  )
}

export default App;
