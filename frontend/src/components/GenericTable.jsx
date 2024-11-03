import React from "react";
import CustomCheckBox from "@/components/CustomCheckBox";
import EditButton from "@/components/EditButton";
import { highlightMatch } from "@/utils/highlightMatch";

const GenericTable = ({
  headers,
  data,
  selectedItems,
  setSelectedItems,
  onEditClick,
  searchTerm,
  onRowDoubleClick,
  rowRenderer,
}) => {
  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAllItems = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg my-6 max-h-[400px] overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-center">
              <CustomCheckBox
                checked={
                  selectedItems.length === data.length && data.length > 0
                }
                onChange={toggleAllItems}
                className="mx-auto"
              />
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th className="px-6 py-3 text-center"></th>{" "}
            {/* Columna para botón de editar */}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-gray-100"
                }
                onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(item)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <CustomCheckBox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="mx-auto"
                  />
                </td>
                {rowRenderer(item, searchTerm)}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <EditButton onEditClick={() => onEditClick(item)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 2}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center"
              >
                No se encontraron coincidencias para "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
