import CircleScroll from "../packages/components/cycle-scroll";
function Example() {
  return (
    <>
      <CircleScroll>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">0</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">1</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">2</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">3</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">4</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">5</div>
        <div className="h-40 w-auto bg-black text-cyan-300 p-6 m-6 border-4">6</div>
      </CircleScroll>
    </>
  );
}

export default Example;
