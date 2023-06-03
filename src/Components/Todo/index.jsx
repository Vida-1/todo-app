import React, { useEffect, useState } from 'react';
import useFormLocal from '../../hooks/form';
import { MantineProvider, Button} from '@mantine/core';
import { v4 as uuid } from 'uuid';


const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useFormLocal(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    console.log(list);
    // const items = list.splice( item => item.id !== id );
    const items = list.splice(id);
    console.log(list);
    setList([items]);
    
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  


  return (
    <>
      <MantineProvider>
        <header data-testid="todo-header">
          <h1 data-testid="todo-h1">{incomplete} items pending</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>
          <label>
            <span>To Do Item</span>
            <input
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />
          </label>
          <label>
            <span>Assigned To</span>
            <input
              onChange={handleChange}
              name="assignee"
              type="text"
              placeholder="Assignee Name"
            />
          </label>

          <label>
            <span>Difficulty</span>
            <input
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              type="range"
              min={1}
              max={5}
              name="difficulty"
            />
          </label>

          <label>
            <Button variant="filled" color="indigo" type="submit">
              Add Item
            </Button>
          </label>
        </form>


        {list.map((item) => (
          <div key={item.id}>
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <div onClick={() => toggleComplete(item.id)}>
              Complete: {item.complete.toString()}
            <Button variant="subtle" color="red" type="submit" onClick={deleteItem}>Delete Item</Button>
            </div>
            <hr />
          </div>
        ))}
      </MantineProvider>
    </>
  );
};

export default Todo;
