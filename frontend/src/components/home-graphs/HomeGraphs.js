import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { FaChartArea, FaChartLine, FaChartBar } from "react-icons/fa";
import { AiOutlineRadarChart, AiFillPieChart } from "react-icons/ai";
import "./HomeGraphs.scss";

const HomeGraphs = ({ graphData }) => {
  const sortByDate = (a, b) => {
    return new Date(a.date) - new Date(b.date);
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#888888"];

  const [yearOrMonth, setYearOrMonth] = useState("year");
  const [filterType, setFilterType] = useState("Income");
  const [pieFilterType, setPieFilterType] = useState("Expense");
  const [chartType, setChartType] = useState("area chart");
  const [pieType, setPieType] = useState("pie");

  const filterForChart = (data) => {
    let yearToday;
    let monthToday;
    var d = new Date();

    if (yearOrMonth === "last-year") {
      yearToday = d.getFullYear() - 1;
    } else if (yearOrMonth === "year") {
      yearToday = d.toISOString().substring(0, 4);
    } else if (yearOrMonth === "last-month") {
      monthToday =
        d.getFullYear().toString() +
        "-" +
        (d.getMonth() === 0
          ? "12"
          : d.getMonth() < 10
          ? "0" + d.getMonth().toString()
          : d.getMonth().toString());
    } else {
      monthToday = new Date().toISOString().substring(0, 7);
    }

    let incomesArray = [];
    let expensesArray = [];
    let bothArray = [];

    const grouped = [];

    data.sort(sortByDate).forEach((obj) => {
      let yearMonth;

      if (yearOrMonth.includes("year")) {
        yearMonth = obj.date.substr(0, 7);
      } else {
        yearMonth = obj.date.substr(0, 13);
      }

      if (
        yearOrMonth.includes("year") &&
        yearMonth.substring(0, 4) === yearToday.toString()
      ) {
        if (!grouped[yearMonth]) {
          grouped[yearMonth] = [];
        }

        grouped[yearMonth].push(obj);
      } else if (
        yearOrMonth.includes("month") &&
        yearMonth.substring(0, 7) === monthToday
      ) {
        if (!grouped[yearMonth]) {
          grouped[yearMonth] = [];
        }

        grouped[yearMonth].push(obj);
      }
    });

    for (const yearMonth in grouped) {
      const objects = grouped[yearMonth];

      if (filterType === "Income & Expense") {
        const totalExpense = objects.reduce((sum, obj) => {
          return obj.isIncome ? sum + 0 : sum - obj.amount;
        }, 0);

        const totalIncome = objects.reduce((sum, obj) => {
          return obj.isIncome ? sum + obj.amount : sum - 0;
        }, 0);

        bothArray.push({
          expense: Math.floor(totalExpense),
          income: Math.floor(totalIncome),
          date: yearMonth,
        });
      } else if (filterType === "Income") {
        const totalIncome = objects.reduce((sum, obj) => {
          return obj.isIncome ? sum + obj.amount : sum - 0;
        }, 0);

        if (totalIncome > 0) {
          incomesArray.push({
            amount: Math.floor(totalIncome),
            date: yearMonth,
          });
        }
      } else {
        const totalExpense = objects.reduce((sum, obj) => {
          return obj.isIncome ? sum + 0 : sum - obj.amount;
        }, 0);

        if (totalExpense < 0) {
          expensesArray.push({
            amount: Math.floor(totalExpense),
            date: yearMonth,
          });
        }
      }
    }

    if (filterType === "Income & Expense") {
      return bothArray;
    } else if (filterType === "Income") {
      return incomesArray;
    } else {
      return expensesArray;
    }
  };

  const filterForPieChart = (data) => {
    let incomesCategorized = [];
    let expensesCategorized = [];

    let incomesSorted = [];
    let expensesSorted = [];

    data.forEach((transaction) => {
      if (!incomesCategorized[transaction.category] && transaction.isIncome) {
        incomesCategorized[transaction.category] = {
          category: transaction.category,
          amount: transaction.amount,
        };
      } else if (transaction.isIncome) {
        incomesCategorized[transaction.category].amount += transaction.amount;
      }

      if (!expensesCategorized[transaction.category] && !transaction.isIncome) {
        expensesCategorized[transaction.category] = {
          category: transaction.category,
          amount: transaction.amount,
        };
      } else if (!transaction.isIncome) {
        expensesCategorized[transaction.category].amount += transaction.amount;
      }
    });

    if (pieFilterType === "Expense") {
      for (const val in expensesCategorized) {
        expensesSorted.push(expensesCategorized[val]);
      }

      return expensesSorted.sort((a, b) => b.amount - a.amount).slice(0, 5);
    } else {
      for (const val in incomesCategorized) {
        incomesSorted.push(incomesCategorized[val]);
      }

      return incomesSorted.sort((a, b) => b.amount - a.amount).slice(0, 5);
    }
  };

  return (
    <div className="home-graphs">
      <div className="area-chart">
        <div>
          <h3 className="top-graph-title">
            {filterType === "Income"
              ? "Income " + chartType
              : filterType === "Expense"
              ? "Expense " + chartType
              : "Income & expense " + chartType}
          </h3>
        </div>
        <ResponsiveContainer width="100%" height="60%">
          {chartType === "area chart" ? (
            <AreaChart
              width={730}
              height={250}
              data={filterForChart(graphData)}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={filterType === "Expense" ? "#8884d8" : "#82ca9d"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={filterType === "Expense" ? "#8884d8" : "#82ca9d"}
                    stopOpacity={0}
                  />
                </linearGradient>
                {filterType === "Income & Expense" ? (
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                ) : null}
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip payload={graphData.category} />
              <Legend />
              <Area
                type="monotone"
                dataKey={
                  filterType === "Income & Expense" ? "income" : "amount"
                }
                stroke={filterType === "Expense" ? "#8884d8" : "#82ca9d"}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              {filterType === "Income & Expense" ? (
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              ) : null}
            </AreaChart>
          ) : chartType === "line chart" ? (
            <LineChart
              width={730}
              height={250}
              data={filterForChart(graphData)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={
                  filterType === "Income & Expense" ? "income" : "amount"
                }
                stroke={filterType === "Expense" ? "#8884d8" : "#82ca9d"}
              />
              {filterType === "Income & Expense" ? (
                <Line type="monotone" dataKey="expense" stroke="#8884d8" />
              ) : null}
            </LineChart>
          ) : (
            <BarChart width={730} height={250} data={filterForChart(graphData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={
                  filterType === "Income & Expense" ? "income" : "amount"
                }
                fill={filterType === "Expense" ? "#8884d8" : "#82ca9d"}
              />

              {filterType === "Income & Expense" ? (
                <Bar dataKey="expense" fill="#8884d8" />
              ) : null}
            </BarChart>
          )}
        </ResponsiveContainer>
        <div className="dropdowns">
          <Dropdown onSelect={(val) => setYearOrMonth(val)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {yearOrMonth === "year"
                ? "This year per month"
                : yearOrMonth === "last-year"
                ? "Last year per month"
                : yearOrMonth === "month"
                ? "This month per day"
                : "Last month per day"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"last-year"}>
                Last year per month
              </Dropdown.Item>
              <Dropdown.Item eventKey={"year"}>
                This year per month
              </Dropdown.Item>
              <Dropdown.Item eventKey={"last-month"}>
                Last month per day
              </Dropdown.Item>
              <Dropdown.Item eventKey={"month"}>
                This month per day
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={(val) => setFilterType(val)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {filterType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Income"}>Income</Dropdown.Item>
              <Dropdown.Item eventKey={"Expense"}>Expense</Dropdown.Item>
              <Dropdown.Item eventKey={"Income & Expense"}>
                Income & Expense
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="chart-type-select">
            <FaChartArea onClick={() => setChartType("area chart")} />
            <FaChartLine onClick={() => setChartType("line chart")} />
            <FaChartBar onClick={() => setChartType("bar chart")} />
          </div>
        </div>
      </div>
      <div className="pie-chart">
        <h3 className="pie-chart-title">
          {"Top 5 categories by " +
            pieFilterType.toLowerCase() +
            " " +
            pieType +
            " chart"}
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          {pieType === "pie" ? (
            <PieChart width={730} height={250}>
              <Pie
                data={filterForPieChart(graphData)}
                dataKey="amount"
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={120}
                fill="#82ca9d"
                nameKey={"category"}
                label
              >
                {filterForPieChart(graphData).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          ) : (
            <RadarChart
              outerRadius={120}
              width={730}
              height={250}
              data={filterForPieChart(graphData)}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={18} domain={[0, 150]} />
              <Radar
                name={pieType}
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
        <div className="pie-type-select">
          <Dropdown
            className="pie-chart-dropdown"
            onSelect={(val) => setPieFilterType(val)}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {pieFilterType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Income"}>Income</Dropdown.Item>
              <Dropdown.Item eventKey={"Expense"}>Expense</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="icon-select">
            <AiOutlineRadarChart onClick={() => setPieType("radar")} />{" "}
            <AiFillPieChart onClick={() => setPieType("pie")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGraphs;
