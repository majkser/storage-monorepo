export default function Loading() {
  return (
    <div className="text-white text-center w-screen h-screen flex flex-col justify-center items-center bg-black">
      <div className="flex justify-center items-center gap-8">
        <div className="w-16 h-16 rounded-full bg-white animate-bounce"></div>
        <div className="w-16 h-16 rounded-full bg-white animate-bounce delay-150"></div>
        <div className="w-16 h-16 rounded-full bg-white animate-bounce delay-300"></div>
      </div>
      <h5 className="h5 text-white mt-5">LOADING...</h5>
    </div>
  );
}
