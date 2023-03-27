import React, { useEffect, useState } from 'react';
import useFormLocal from '../../hooks/form';
import { MantineProvider, Button, TextInput, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
// import { Slider, RangeSlider } from '@mantine/core';
import { v4 as uuid } from 'uuid';


// function MantineDemo() { //from: https://mantine.dev/form/use-form/
//   const form = useForm({
//     initialValues: {
//       itemDetails: "Item Details",
//       assigneeName: "Assignee Name"
//     }
//   });
//   return (
//     <Box maw = { 300} mx = "auto" >
//       <form onSubmit={form.onSubmit((values) => console.log(values))}>
//         <TextInput
//           label="To Do Item"
//           placeholder="Item Details"
//           {...form.getInputProps('itemDetails')}
//         />
//         <Group position="right" mt="md">
//           <Button type="submit">Submit2</Button>
//         </Group>
//       </form>
//   </Box>
//   );
// }

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
    const items = list.filter( item => item.id !== id );
    setList(items);
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
          <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
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

          {/* <label>
            <Slider
              color="indigo"
              defaultValue={3}
              const
              marks={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
              ]}
              onChange={handleChange}
            ></Slider>
          </label> */}
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
            </div>
            <hr />
          </div>
        ))}
      </MantineProvider>
    </>
  );
};

export default Todo;
