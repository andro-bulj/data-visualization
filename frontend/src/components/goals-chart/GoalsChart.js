import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Legend,
  Line,
  Bar,
  ResponsiveContainer
} from "recharts";
import "./GoalsChart.scss";

const GoalsChart = ({ goals }) => {
  const filterGoals = (data) => {
    const filtered = data
      .filter((goal) => goal.isCompleted)
      .map((goal) => {
        const dateSet = new Date(goal.dateSet);
        const dateCompleted = new Date(goal.dateCompleted);

        const timeDiffInMilliseconds = Math.abs(dateSet - dateCompleted);
        const daysToComplete = Math.floor(
          timeDiffInMilliseconds / (1000 * 60 * 60 * 24)
        );
        return {
          dateCompleted: goal.title,
          daysToComplete: daysToComplete,
          averageSavedPerDay: (
            goal.currentGoalAmount / (daysToComplete ? daysToComplete : 1)
          ).toFixed(2),
        };
      });

    return filtered;
  };

  return (
    <div className="goals-chart">
      <h3>Goals combined chart</h3>
      <ResponsiveContainer width="100%" height="70%">
        <ComposedChart width={730} height={250} data={filterGoals(goals)}>
          <XAxis dataKey="dateCompleted" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="daysToComplete" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="averageSavedPerDay" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalsChart;
