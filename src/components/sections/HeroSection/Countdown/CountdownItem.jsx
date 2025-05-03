function CountdownItem({ time, label }) {
  return (
    <div className="flex flex-col text-2xl md:text-6xl items-center font-bold text-white-50 col-span-1">
      {time}
      <p className="text-base font-semibold m-0">{label}</p>
    </div>
  );
}
export default CountdownItem;