import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-md p-2">
      <TailSpin
        height="28"
        width="28"
        color="#D2D3E0"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <h1 className="text-text text-sm font-medium ml-5">Loading...</h1>
    </div>
  );
}
