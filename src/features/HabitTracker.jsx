import { useState, useEffect } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");

  function addHabit() {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        id: crypto.randomUUID(),
        name: input,
        completed: false,
      },
    ]);

    setInput("");
  }

  return (
    <div>
      <h2>Daily Habits</h2>

      <input
        type="text"
        placeholder="New habit..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addHabit}>Add</button>

      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input type="checkbox" />
            {habit.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
