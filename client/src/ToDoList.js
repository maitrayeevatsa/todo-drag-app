import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { nanoid } from "nanoid";

export default function ToDoList() {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:3003/getlist").then((response) => {
      setData(response.data);
    });
  };
  const [todoItem, setTodoItem] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    if (Object.keys(todoItem).length !== 0) {
      // Send data to the backend via POST
      axios({
        method: "post",
        baseURL: "http://localhost:3003",
        url: "/addlist",
        data: todoItem,
      })
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [todoItem]);

  const onSubmit = (event) => {
    const id = nanoid();
    setTodoItem({ id, name: name });
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 100);
  }, [todoItem]);

  const handleEnd = (result) => {
    if (!result.destination) return; //if no destination exits(cancel event), exit this function
    const items = Array.from(newData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNewData(items);
  };

  // Looping through arrays created from Object.keys
  useEffect(() => {
    const keys = Object.keys(data);
    let formatData = [];
    for (const key of keys) {
      formatData.push(data[key]);
    }
    setNewData(formatData);
  }, [data]);

  return (
    <div className="App">
      <div style={{marginLeft:"-750px"}}>
        <label>
          Task Name:
          <input type="text" autoComplete="off" onChange={handleChange} />
        </label>
        <input type="button" value="Add" onClick={(e) => onSubmit(e)} />
      </div>
      <div
        style={{
          width: "250px",
          float: "left",
          height: "100px",
          margin: "10px",
        }}
      >
        <h5>Block 1</h5>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="to-dos">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {newData?.map((item, index) => (
                  <Draggable
                    key={item?.id}
                    draggableId={item?.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        key={item?.id}
                        className={
                          snapshot.isDragging ? "selected_1" : "not-selected_1"
                        }
                      >
                        {index + 1}.{item?.name}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div
        style={{
          width: "250px",
          float: "left",
          height: "100px",
          margin: "10px",
        }}
      >
        <h5>Block 2</h5>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="to-dos">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {newData?.map((item, index) => (
                  <Draggable
                    key={item?.id}
                    draggableId={item?.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        key={item?.id}
                        className={
                          snapshot.isDragging ? "selected_2" : "not-selected_2"
                        }
                      >
                        {index + 1}.{item?.name}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
