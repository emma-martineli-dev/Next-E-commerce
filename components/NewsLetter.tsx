
const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
        <h1 className="md:text-4xl text-2xl font-medium text-slate-100">
            Subscribe now & get 20% off
        </h1>
        <p className="md:text-base text-slate-500 pb-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, itaque!
        </p>
        <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
            <input type="email" placeholder="Enter your email" className="border border-[#1E3A5F] bg-[#0C1F35] rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-slate-300 placeholder-slate-500"/>
            <button className="bg-orange-600 text-white md:px-12 px-8 h-full rounded-md rounded-l-none cursor-pointer">
                Subscribe
            </button>
        </div>
    </div>
  ); 
}; 

export default NewsLetter