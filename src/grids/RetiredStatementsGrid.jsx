// react imports
import { useEffect, useMemo, useState } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListOfRetirementStatementsQuery,
  useRemoveRetirementStatementMutation,
} from "../slices/retirementStatementApiSlice.js";
import { setStatementTableData } from "../slices/statementDataSlice.js";

// mui imports
import {
  IconButton,
  Button,
  Box,
  Tooltip,
  PaginationItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Add as AddIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "../components/Modal";
import GenerateStatementForm from "../forms/GenerateStatementForm.jsx";
import RetirementStatementViewForm from "../forms/RetirementStatementViewForm.jsx";

// library imports
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper.js";

// utils imports
import { defaultTableOptions } from "../utils.js";

function RetiredStatementsGrid() {
  const [statementID, setStatementID] = useState(null);

  const [rowSelection, setRowSelection] = useState({});
  const [showGenerateStatementModal, setShowGenerateStatementModal] =
    useState(false);
  const [showViewStatementModal, setShowViewStatementModal] = useState(false);
  const [showDeleteStatementModal, setShowDeleteStatementModal] =
    useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [removeRetirmentStatement, { isLoading: isDeleting }] =
    useRemoveRetirementStatementMutation();

  // access the data from redux store
  const { statementTableData } = useSelector((state) => state.statementData);

  const {
    data: statements,
    isSuccess,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetListOfRetirementStatementsQuery(personID);

  // HANDLERS
  const handleGenerateStatementModalChange = () => {
    setShowGenerateStatementModal(true);
  };

  const handleViewStatementModalChange = () => {
    setShowViewStatementModal(true);
  };

  const handleDeleteStatementModalChange = () => {
    setShowDeleteStatementModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleRemoveStatement = async () => {
    try {
      const deleteRes = await removeRetirmentStatement({
        rsID: statementID,
      }).unwrap();
      console.log(deleteRes);
      setShowDeleteStatementModal(false);
      toast.success(deleteRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = statements.map((item) => ({
        id: item.retirementStatementID,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo,
        retirementStatementIssueDate: item.retirementStatementIssueDate,
        retirementStatementRunDate: item.retirementStatementRunDate,
        retirementStatementIssueConfirmDate:
          item.retirementStatementIssueConfirmDate,
      }));
      dispatch(setStatementTableData(data));
    }

    return () => {
      dispatch(setStatementTableData([]));
    };
  }, [
    isSuccess,
    refetch,
    dispatch,
    statements,
    showGenerateStatementModal,
    showDeleteStatementModal,
  ]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "retirementStatementNo",
        size: 20,
        header: "شماره حکم",
      },
      {
        accessorKey: "retirementStatementSerial",
        size: 20,
        header: "سریال حکم",
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "retirementStatementTypeName",
        header: "نوع حکم",
      },
      {
        accessorKey: "retirementStatementIssueDate",
        header: "تاریخ صدور",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "retirementStatementRunDate",
        header: "تاریخ اجرا",
        Cell: ({ renderedCellValue }) => (
          <div>
            {convertToPersianNumber(
              convertToPersianDateFormatted(renderedCellValue)
            )}
          </div>
        ),
      },
      {
        accessorKey: "observeStatement",
        header: "مشاهده حکم",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: () => (
          <IconButton color="primary" onClick={handleViewStatementModalChange}>
            <RemoveRedEyeIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "removeStatement",
        header: "حذف حکم",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={
              row.original.retirementStatementIssueConfirmDate
                ? "حکم تایید شده"
                : "حذف حکم"
            }
          >
            <span>
              <IconButton
                color="error"
                disabled={
                  row.original.retirementStatementIssueConfirmDate
                    ? true
                    : false
                }
                onClick={handleDeleteStatementModalChange}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: statementTableData,
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
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        <Button
          dir="ltr"
          endIcon={<AddIcon />}
          variant="contained"
          onClick={handleGenerateStatementModalChange}
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>صدور</span>
        </Button>

        <LoadingButton
          dir="ltr"
          endIcon={<RefreshIcon />}
          loading={isFetching}
          onClick={handleRefresh}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بروز رسانی</span>
        </LoadingButton>
      </Box>
    ),
    muiPaginationProps: {
      color: "success",
      variant: "outlined",
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      setStatementID(id);
    }
  }, [dispatch, table, rowSelection, statementTableData]);

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <>
          {showViewStatementModal ? (
            <Modal
              title={"مشاهده حکم"}
              closeModal={() => setShowViewStatementModal(false)}
            >
              <RetirementStatementViewForm statementID={statementID} />
            </Modal>
          ) : showDeleteStatementModal ? (
            <Modal
              title={"حذف حکم"}
              closeModal={() => setShowDeleteStatementModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این حکم اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  variant="contained"
                  onClick={handleRemoveStatement}
                  loading={isDeleting}
                  color="success"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>بله</span>
                </LoadingButton>
                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  onClick={() => setShowDeleteStatementModal(false)}
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "sahel" }}
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : showGenerateStatementModal ? (
            <Modal
              title={"ایجاد حکم بازنشسته"}
              closeModal={() => setShowGenerateStatementModal(false)}
            >
              <GenerateStatementForm
                setShowGenerateStatementModal={setShowGenerateStatementModal}
              />
            </Modal>
          ) : null}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default RetiredStatementsGrid;
