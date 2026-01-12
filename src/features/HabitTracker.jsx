import { useState, useEffect } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

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

  function toggleHabit(id) {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  }

  function deleteHabit(id) {
    setHabits(habits.filter((habit) => habit.id !== id));
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
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit.id)}
            />
            <span
              style={{
                textDecoration: habit.completed ? "line-through" : "none",
                color: habit.completed ? "#999" : "#333",
              }}
            >
              {habit.name}
            </span>

            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
