import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-x-auto w-full pb-44">
      <table className="min-w-full divide-y divide-blue-200 bg-white dark:bg-gray-800 shadow-md rounded-xl ">
        <thead className="bg-primary dark:bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-2 py-3 text-left text-sm font-semibold text-white dark:text-primary tracking-wide uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 py-3 text-sm whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
