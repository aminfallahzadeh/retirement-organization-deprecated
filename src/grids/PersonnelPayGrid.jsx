// REACT IMPORTS
import { useMemo, useState } from "react";

// RRD
import { Link } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// MUI
import { IconButton, PaginationItem, Tooltip } from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// HELPS
import { convertToPersianNumber } from "../helper.js";

// UTILS
import { defaultTableOptions } from "../utils.js";

function PersonnelPayGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const { personTableData } = useSelector((state) => state.personData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "personRowNum",
        header: "ردیف",
        size: 20,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "personFirstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "personLastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "personNationalCode",
        header: "کد ملی",
        size: 20,

        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "personnelID",
        header: "شماره کارمندی",
        size: 20,

        Cell: ({ renderedCellValue }) => (
          <span>{convertToPersianNumber(renderedCellValue)}</span>
        ),
      },
      {
        accessorKey: "observeStaff",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`${row.original.personFirstName} ${row.original.personLastName}`}
          >
            <Link
              to={`/retirement-organization/personnel-statements/info?personID=${row.id}&personDeathDate=${row.original.personDeathDate}`}
            >
              <IconButton color="primary" sx={{ padding: "0" }}>
                <EyeIcon />
              </IconButton>
            </Link>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: personTableData,
    muiPaginationProps: {
      size: "small",
      shape: "rounded",
      showRowsPerPage: false,
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = <MaterialReactTable table={table} />;
  return content;
}

export default PersonnelPayGrid;
