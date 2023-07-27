// Form to get ticker and date

const HomeForm = (props) => {
  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        e.target[0].value = e.target[0].value?.toUpperCase();
        const [stock, date] = [e.target[0].value, e.target[1].value];

        // console.log(stock, date);
        props.setstockInfo({ stock, date });
      }}
    >
      <div className="flex flex-col items-center justify-center w-4/5 md:w-1/3">
        <label className="text-2xl font-bold">Ticker</label>
        <input
          className="border-2 border-gray-300 p-2 m-2 rounded-lg text-black text-center w-full"
          type="text"
          placeholder="Enter ticker"
          // validation alphabet only
          pattern="[a-zA-Z]+"
          required
          autoFocus
        />
      </div>
      <div className="flex flex-col items-center justify-center w-4/5 md:w-1/3">
        <label className="text-2xl font-bold">Date</label>
        <input
          className="border-2 border-gray-300 p-2 m-2 rounded-lg text-black text-center w-full"
          type="date"
          placeholder="Enter date"
          required
        />
      </div>
      <button
        className="bg-amber-500 hover:bg-amber-200 hover:text-black font-bold my-2 py-2 px-4 rounded-lg"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default HomeForm;
