import React, { useState, useEffect } from 'react';
import { Button, Input, List} from 'antd';
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    const fetchTasks = async () => {
      const username = localStorage.getItem('username');
      const response = await fetch('/gettasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      setTodos(data.tasks);
      console.log(data.tasks);
    }

    fetchTasks();
  }, []);

  const addTask = async () => {
    const username = localStorage.getItem('username');
    const taskId = uuidv4();
    const response = await fetch('/createtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, task, taskId })
    });

    const data = await response.json();
    console.log("message: " + data.message);
    if (data.success) {
      console.log("successfully added task");
      console.log(task);
      var tempObject = {taskId: taskId, text: task, completed: false};
      setTodos(todos => [...todos, tempObject]);
      setTask('');
      
      console.log(todos);
    } else {
        console.log("something went wrong");
        console.log("error: " + data.error);
    }
  }

  const deleteTask = async (taskId) => {
    const username = localStorage.getItem('username');
    const response = await fetch('/deletetask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, taskId })
    });

    const data = await response.json();
    if (data.success) {
        console.log("successfully deleted task " + taskId);
      setTodos(todos.filter(task => task.taskId !== taskId));
    } else {
      console.error("Error deleting task:", data.message);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/login';
  }


  return (
    <div>
      <h1>Todo List</h1>
      <Input 
            value={task}
            onChange={(e) => setTask(e.target.value)}
        />
      <Button onClick={addTask}>
            Add Task
      </Button>
      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
            <List.Item actions={[<Button onClick={() => deleteTask(todo.taskId)}>Delete</Button>]}>
            {todo.text}
            </List.Item>
        )}
        />
      <Button onClick={handleLogout}>
            Logout
      </Button>
    </div>
  );
}

export default Home;
