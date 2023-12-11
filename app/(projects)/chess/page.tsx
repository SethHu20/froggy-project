export default function ChessPage() {
  function generateLists() {
    const numOfLists = 8;
    let lists = [];

    for (let i = 0; i < numOfLists; i++) {
      let cells = [];
      for (let j = 0; j < 8; j++) {
        cells.push(0);
      }
      lists.push(cells);
    }

    return lists;
  }

  const testBoard = generateLists();

  return (
    <div className='bg-slate-950 min-h-screen flex flex-col justify-center items-center text-white'>
      <h1 className='text-3xl text-center'>Froggy Project - Chess</h1>
      <div
        role='grid'
        className='grid grid-rows-8 h-[600px] w-[600px]'
      >
        {testBoard.map((row, i) => (
          <div
            key={i}
            role='row'
            className='grid grid-cols-8'
          >
            {row.map((_, j) => (
              <div
                key={i << 3 + j}
                role='gridcell'
                className={`h-full w-full ${
                  (i + j) % 2 ? 'bg-yellow-900' : 'bg-yellow-50'
                }`}
              >
                {i}
                {j}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
