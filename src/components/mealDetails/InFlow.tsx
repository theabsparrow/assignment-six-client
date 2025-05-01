const InFlow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        {label}:{" "}
        <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100 px-3 py-1 rounded-full">
          {value || "N/A"}
        </span>
      </p>
    </div>
  );
};

export default InFlow;
