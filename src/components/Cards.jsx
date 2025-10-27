export default function Cards({countries, onCardClick}) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Countries of the world</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {
          countries.sort(()=>Math.random()-0.5).map(country => 
            <Card 
              key={country.name}
              flag={country.flag}
              name={country.name}
              onCardClick={onCardClick}
            />
          )
        }
      </div>
    </div>
  )
}

function Card({flag, name, onCardClick}) {
  return (
    <div
      onClick={() => {onCardClick(name)}}
      className="flex flex-col items-center bg-[#E0F7FA] shadow-md rounded-xl overflow-hidden border-dashed border-4 border-[#8FC3FD] hover:scale-105 transition-transform duration-200 cursor-pointer active:bg-blue-500">
      <img 
        className="w-full h-24 sm:h-30 md:h-40 lg:h-50 object-contain bg-gray-100 active:bg-blue-500"
        src={flag} 
      />
      <p className="text-center text-sm font-bold p-2 uppercase">{name}</p>
    </div>
  )
}

