import TrafficLight from "./components/Traffic/TrafficLight";

function App() {
  const trafficLight = [
    {
      color: "yellow",
      time: 2000,
      displayOrder: 1,
      order: 1,
    },
    {
      color: "red",
      time: 2000,
      displayOrder: 2,
      order: 3,
    },
    {
      color: "green",
      time: 2000,
      displayOrder: 3,
      order: 2,
    },
  ];

  return (
    <>
      <TrafficLight data={trafficLight} />
    </>
  );
}

export default App;
