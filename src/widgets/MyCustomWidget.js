import React, { useState } from 'react';

export default function MyCustomWidget() {
  const [goals, setGoals] = useState([
    // Example initial goal for demonstration,when you launch the app it will displayed by default.
    {
      id: 1,
      title: "Example Goal",
      description: "This is an example goal for demonstration purposes.",
      deadline: "2023-12-31",
      subtasks: [
        { id: 1, task: "Subtask 1", completed: false },
        { id: 2, task: "Subtask 2", completed: true },
        { id: 3, task: "Subtask 3", completed: false },
      ],
      category: "Personal",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    subtasks: [],
    category: "Personal",
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      setGoals([...goals, { ...newGoal, id: new Date().getTime() }]);
      setNewGoal({
        title: "",
        description: "",
        deadline: "",
        subtasks: [],
        category: "Personal",
      });
    }
  };

  const toggleSubtask = (goalId, subtaskId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            subtasks: goal.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
          }
        : goal
    );
    setGoals(updatedGoals);
  };

  const removeGoal = (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
  };

  return (
    <div>
      <h2>MAKADESI'S Goals Widget</h2>
      <div>
        <input
          type="text"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          placeholder="Enter goal title"
        />
        <textarea
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          placeholder="Enter goal description"
        />
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
        />
        <select
          value={newGoal.category}
          onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
        </select>
        <button onClick={addGoal}>Add Goal</button>
      </div>

      <div>
        {goals.map((goal) => (
          <div key={goal.id}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Deadline: {goal.deadline}</p>
            <p>Category: {goal.category}</p>
            <h4>Subtasks:</h4>
            <ul>
              {goal.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  onClick={() => toggleSubtask(goal.id, subtask.id)}
                  style={{
                    textDecoration: subtask.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {subtask.task}
                </li>
              ))}
            </ul>
            <button onClick={() => removeGoal(goal.id)}>Remove Goal</button>
          </div>
        ))}
      </div>
    </div>
  );
}
