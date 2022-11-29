interface ErrorProps {
    refetch: () => void;
}
const Error: React.FC<ErrorProps> = ({ refetch }) => {
    return (
        <button
            className="py-1 px-4 w-28 mx-auto rounded bg-bg hover:bg-hover ring-2 my-5 ring-border text-text"
            onClick={() => refetch()}
        >
            Retry
        </button>
    )
}

export default Error