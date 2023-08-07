import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import AxiosService from "./AxiosService";
import HelperService from "./HelperService";

class InventoryService {
  private _helper;

  constructor() {
    this._helper = new HelperService();
  }

  inventoryColumn: any[] = [
    {
      cell: (row: any) => (
        <IconButton
          as={Link}
          to={`/inventories/edit/${row.id}`}
          colorScheme="blue"
          aria-label="Edit Inventory item"
          size="sm"
          variant={"outline"}
          borderRadius="0px"
          icon={<EditIcon />}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      name: "",
      width: "40px",
      selector: (row: any) => row.id,
    },
    {
      id: "item_category",
      name: "Category",
      width: "140px",
      sortable: true,
      selector: (row: any) => row.item_category,
    },
    {
      id: "item_type",
      name: "Item Type",
      width: "170px",
      sortable: true,
      selector: (row: any) => row.item_type,
    },
    {
      id: "item_code",
      name: "Item Code",
      width: "150px",
      sortable: true,
      selector: (row: any) => row.item_code,
    },
    {
      id: "item_desc",
      name: "Description",
      width: "300px",
      sortable: true,
      selector: (row: any) => row.item_desc,
    },
    {
      id: "heat_no",
      name: "Heat No.",
      width: "120px",
      sortable: true,
      selector: (row: any) => row.heat_no,
    },
    {
      id: "quantity",
      name: "Quantity",
      width: "110px",
      sortable: true,
      selector: (row: any) => row.quantity,
    },
    {
      id: "weight",
      name: "Weight",
      width: "110px",
      sortable: true,
      selector: (row: any) => row.weight,
    },
    {
      id: "length",
      name: "Length",
      width: "110px",
      sortable: true,
      selector: (row: any) => row.length,
    },
    {
      id: "width",
      name: "Width",
      width: "110px",
      sortable: true,
      selector: (row: any) => row.width,
    },
    {
      id: "warehouse",
      name: "Warehouse",
      width: "110px",
      sortable: true,
      selector: (row: any) => row.warehouse,
    },
    {
      id: "is_excess",
      name: "Excess Material",
      width: "140px",
      sortable: true,
      selector: (row: any) => (row.is_excess == 1 ? "YES" : "NO"),
    },
    {
      id: "updated_at",
      name: "Updated at",
      width: "180px",
      sortable: true,
      selector: (row: any) => this._helper.formatDate(new Date(row.updated_at)),
    },
  ];

  allData = () => {
    return AxiosService.get("/inventories");
  };

  add = (param: any) => {
    return AxiosService.post("/inventories", param);
  };

  update = (param: any) => {
    const id = param.id;
    return AxiosService.put(`/inventories/${id}`, param);
  };

  delete = (param: any) => {
    return AxiosService.delete("/inventory-items-delete", { params: param });
  };

  items = (param: any) => {
    return AxiosService.get("/inventories-items", { params: param });
  };

  itemTypes = () => {
    return AxiosService.get("/inventories-item-types");
  };

  details = (id: number) => {
    return AxiosService.get(`/inventories/${id}`);
  };

  warehouses = () => {
    return AxiosService.get("/inventories-warehouse");
  };
}

export default InventoryService;
