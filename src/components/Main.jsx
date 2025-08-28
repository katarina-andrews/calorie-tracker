import { useState, useEffect } from "react";
import { listAllItems, createItem } from "../utils/dynamo";

export default function Main() {
  const [calorieRecords, setCalorieRecords] = useState([]);

  useEffect(() => {
    const handleGetRecords = async () => {
      const items = await listAllItems("CalorieRecord");

      setCalorieRecords(items);
    };

    handleGetRecords();
  }, []);

  const handleCreateRecord = async (event) => {
    event.preventDefault();

    const newCalorieRecord = {
      id: Date.now().toString(),
      food: event.target.food.value,
      servings: event.target.servings.value,
      calories: event.target.calories.value,
    };

    await createItem("CalorieRecord", newCalorieRecord);

    setCalorieRecords((oldCalorieRecords) => [
      ...oldCalorieRecords,
      newCalorieRecord,
    ]);
  };

  return (
    <main>
      <section>
        <form onSubmit={(event) => handleCreateRecord(event)}>
          <label htmlFor="food">Food</label>
          <input type="text" name="food" id="foodInput" />
          <br />
          <label htmlFor="servings">Servings</label>
          <input type="number" name="servings" id="servingsInput" />
          <br />
          <label htmlFor="calories">Calories</label>
          <input type="number" name="calories" id="caloriesInput" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section>
        <h2>Recorded Results</h2>

        {calorieRecords?.map((record, index) => {
          return (
            <div className="calorie-record-div" key={index}>
              <div>
                <h3>Food</h3>
                <p>{record.food}</p>
              </div>
              <div>
                <h3>Servings</h3>
                <p>{record.servings}</p>
              </div>

              <div>
                <h3>Calories</h3>
                <p>{record.calories}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}














// import { useState, useEffect } from "react";
// import { listAllItems, createItem } from "../utils/dynamo";

// export default function Main() {
//   const [calorieRecords, setCalorieRecords] = useState([]);

//   useEffect(() => {
//     const handleGetRecords = async () => {
//       const items = await listAllItems("CalorieRecord");

//       setCalorieRecords(items);
//     };

//     handleGetRecords();
//   }, []);

//   const handleCreateRecord = async (event) => {
//     event.preventDefault();

//     const newCalorieRecord = {
//       id: Date.now().toString(),
//       food: event.target.food.value,
//       servings: event.target.servings.value,
//       calories: event.target.calories.value,
//     };

//     await createItem("CalorieRecord", newCalorieRecord);

//     setCalorieRecords((oldCalorieRecords) => [
//       ...oldCalorieRecords,
//       newCalorieRecord,
//     ]);
//   };

//   return (
//     <main>
//       <section>
//         <form onSubmit={(event) => handleCreateRecord(event)}>
//           <label htmlFor="food">Food</label>
//           <input type="text" name="food" id="foodInput" />
//           <br />
//           <label htmlFor="servings">Servings</label>
//           <input type="number" name="servings" id="servingsInput" />
//           <br />
//           <label htmlFor="calories">Calories</label>
//           <input type="number" name="calories" id="caloriesInput" />
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </section>

//       <section>
//         <h2>Recorded Results</h2>

//         {calorieRecords.map((record, index) => {
//           return (
//             <div className="calorie-record-div" key={index}>
//               <div>
//                 <h3>Food</h3>
//                 <p>{record.food}</p>
//               </div>
//               <div>
//                 <h3>Servings</h3>
//                 <p>{record.servings}</p>
//               </div>

//               <div>
//                 <h3>Calories</h3>
//                 <p>{record.calories}</p>
//               </div>
//             </div>
//           );
//         })}
//       </section>
//     </main>
//   );
// }
