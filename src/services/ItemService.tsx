import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import AxiosService from "./AxiosService";
import HelperService from "./HelperService";

class ItemService {
  private _helper;

  constructor() {
    this._helper = new HelperService();
  }

  itemColumn = [
    {
      cell: (row: any) => (
        <IconButton
          as={Link}
          to={`/items/edit/${row.id}`}
          colorScheme="blue"
          aria-label="Edit Item"
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
      width: "200px",
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
      id: "size",
      name: "Size",
      sortable: true,
      width: "150px",
      selector: (row: any) => row.size,
    },
    {
      id: "weight",
      name: "Weight",
      sortable: true,
      selector: (row: any) => row.weight,
    },
    {
      id: "update_user",
      name: "Updated By",
      width: "150px",
      sortable: true,
      selector: (row: any) => row.update_user,
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
    return AxiosService.get("/items");
  };

  add = (param: any) => {
    return AxiosService.post("/items", param);
  };

  update = (param: any) => {
    return AxiosService.put("/items/" + param.id, param);
  };

  delete = (param: any) => {
    return AxiosService.delete("/items-delete", { params: param });
  };

  details = (id: number) => {
    return AxiosService.get(`/items/${id}`);
  };
}

export default ItemService;
