import { TailSpin } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <TailSpin
                height="42"
                width="42"
                color="#D2D3E0"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <h1 className="text-text text-sm">Loading...</h1>
        </div>
    );
}
