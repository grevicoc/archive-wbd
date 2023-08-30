import React from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

interface ColumnObjects {
  col1: number;
  col2: string;
}

interface Props {
  data: any;
  columns: any;
}

const ResepTable = ({ data, columns }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<ColumnObjects>(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-2 flex flex-col">
      <div className="my-2 overflow-x-auto mx-4 sm:mx-6 lg:mx-8">
        <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {/* apply the table props */}
            <table {...getTableProps()} className="min-w-full">
              <thead className="bg-gray-300 min-w-full">
                {
                  // Loop over the header rows
                  headerGroups.map((headerGroup, index) => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map((column, index) => (
                          // Apply the header cell props
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            key={index}
                          >
                            {column.render('Header')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline-block"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline-block"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                  </svg>
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody className="bg-white" {...getTableBodyProps()}>
                {
                  // Loop over the table rows
                  page.map((row, index) => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      <tr {...row.getRowProps()} key={index}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell, index) => {
                            // Apply the cell props
                            return (
                              <td
                                className="px-6 py-4 whitespace-nowrap"
                                {...cell.getCellProps()}
                                key={index}
                              >
                                {
                                  // Render the cell contents
                                  cell.render('Cell')
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="mt-2 rounded-md shadow-sm flex items-center">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="m-2 py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="m-2 py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="m-2 py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="m-2 py-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResepTable;
