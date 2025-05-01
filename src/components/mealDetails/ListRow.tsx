const ListRow = ({ label, items }: { label: string; items: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}:
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-100 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ListRow;
