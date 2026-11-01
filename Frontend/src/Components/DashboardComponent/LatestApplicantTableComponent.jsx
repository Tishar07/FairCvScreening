import { Table } from "react-bootstrap";
import {
  useTable,
  tableFeatures
} from "@tanstack/react-table";

const features = tableFeatures({});

const data = [
  { id: 1, name: "John Doe", score: 85, status: "Pending" },
  { id: 2, name: "Jane Smith", score: 72, status: "Pending" },
  { id: 3, name: "Alex Brown", score: 91, status: "Pending" },
  {id: 4, name: "Sebra Loni", score: 76, status: "Shortlisted"}
];

const columns = [
  {
    accessorKey: "name",
    header: "Applicant",
  },
  {
    accessorKey: "score",
    header: "Match Score",
    cell: (info) => `${info.getValue()}%`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export default function LatestApplicantTableComponent() {
    const statusStyles = {
        Shortlisted: {
            background: "#203d2c",
            color: "#7ee2a8",
        },
        Rejected: {
            background: "#3d2020",
            color: "#e27e7e",
        },
        Pending: {
            background: "#3d3520",
            color: "#e2c87e",
        },
    };

  const table = useTable({
    features,
    columns,
    data
  });

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #1c1c1c, #292929)",
        border: "1px solid #3a3a3a",
        borderRadius: "16px",
        boxSizing: "border-box",
        padding: "20px",
        width: "100%",
        overflow: "hidden"
      }}
    >

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div>
          <h5
            style={{
              color: "#ffffff",
              margin: 0,
              fontWeight: 600
            }}
          >
            Latest Applicants
          </h5>

          <small style={{ color: "#8f8f8f" }}>
            Recently screened candidates
          </small>
        </div>


      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <Table
          responsive
          style={{
            margin: 0,
            color: "#ffffff",
            background: "transparent"
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      background: "transparent",
                      color: "#8f8f8f",
                      borderBottom: "1px solid #3a3a3a",
                      borderTop: "none",
                      padding: "12px 14px",
                      fontSize: "12px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : <table.FlexRender header={header} />
                    }
                  </th>
                ))}

              </tr>
            ))}
          </thead>

        <tbody>
        {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
            {row.getAllCells().map((cell) => (
                <td
                key={cell.id}
                style={{
                    background: "transparent",
                    color: "#e5e5e5",
                    border: "none",
                    borderBottom: "1px solid #333333",
                    padding: "15px 14px",
                    verticalAlign: "middle",
                    fontSize: "14px",
                }}
                >
                {cell.column.id === "score" ? (
                    <span
                    style={{
                        background: "#203d2c",
                        color: "#7ee2a8",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: 600,
                    }}
                    >
                    {cell.getValue()}%
                    </span>
                ) : cell.column.id === "status" ? (
                    <span
                        style={{
                        ...(
                            statusStyles[cell.getValue()] || {
                            background: "#333333",
                            color: "#bdbdbd",
                            }
                        ),
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 500,
                        display: "inline-block",
                        }}
                    >
                        {cell.getValue()}
                    </span>
                ) : (
                    cell.getValue()
                )}
                </td>
            ))}
            </tr>
        ))}
        </tbody>

        </Table>
      </div>
    </div>
  );
}