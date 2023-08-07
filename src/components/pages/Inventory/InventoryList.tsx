import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import InventoryService from "../../../services/InventoryService";
import MessageService from "../../../services/MessageService";
import User from "../../../auth/User";

const InventoryList = () => {
  const mySwal = withReactContent(Swal);
  const [inventories, setInventories] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("");
  const [warehouseOption, setWarehouseOption] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const inventory = new InventoryService();
  const message = new MessageService();

  let filteredItem = [];
  const options = [
    { value: "RAW MATERIAL", text: "Raw Material" },
    { value: "FINISHED GOODS", text: "Finished Goods" },
    { value: "CRUDE", text: "Crude" },
  ];

  const handleSelectRow = useCallback(
    (state: any) => setSelectedData(state.selectedRows),
    []
  );

  const colObj: any[] = useMemo(() => inventory.inventoryColumn, []);

  // Design variables
  const flexDesign = {
    borderStyle: "solid",
    borderColor: useColorModeValue("gray.200", "gray.900"),
    align: "center",
  };

  const titleDesign = {
    fontFamily: "heading",
    fontWeight: 500,
    minW: "130px",
  };

  useEffect(() => {
    getInventoryList();
    getWarehouses();
  }, []);

  // Functions
  const getInventoryList = async () => {
    setPending(true);
    setColumns(colObj);

    await inventory
      .allData()
      .then(({ data }) => {
        setPending(false);
        setInventories(data);
      })
      .catch((err) => {
        if (err.response != undefined) {
          const errMessage = err.response.data;
          message.error(errMessage);
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  const getWarehouses = async () => {
    await inventory
      .warehouses()
      .then(({ data }) => {
        setWarehouseOption(data);
      })
      .catch((err) => {
        if (err.response != undefined) {
          const errMessage = err.response.data;
          message.error(errMessage);
        }
      })
      .then(() => {
        setPending(false);
      });
  };

  const deleteItem = () => {
    const id: number[] = [];

    selectedData.map((sdata: any) => {
      id.push(sdata.id);
    });

    if (id.length > 0) {
      mySwal
        .fire({
          title: "Do you want to delete these Inventory Items?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            try {
              const param: any = {
                id: id,
                user_id: User.id,
              };
              setLoading(true);
              inventory
                .delete(param)
                .then((response) => {
                  try {
                    message.messageRedirect(response.data);
                    setInventories(response.data.data);
                  } catch (error) {
                    console.log(error);
                  }
                })
                .catch((err) => {
                  if (err.response != undefined) {
                    const errMessage = err.response.data;
                    message.error(errMessage);
                  }
                })
                .then(() => {
                  setLoading(false);
                });
            } catch (error) {
              console.log(error);
            }
          } else if (result.isDenied) {
            Swal.fire(
              "You chose not to delete the inventory item.",
              "",
              "info"
            );
          }
        });
    } else {
      message.messageRedirect({
        message: "Please select at least 1 Item.",
        status: "warning",
      });
    }
  };

  // Event Functions
  const handleCategory = (e: any) => {
    const categ = e.target.value.toLocaleLowerCase();
    setCategory(categ);
  };

  const handleWarehouse = (e: any) => {
    const whs = e.target.value.toLocaleLowerCase();
    setWarehouse(whs);
  };

  const handleSearch = (e: any) => {
    const ss = e.target.value.toLocaleLowerCase();
    setSearch(ss);
  };

  filteredItem = inventories.filter((i: InventoryInterface) => {
    let item_type = i.item_type != null ? i.item_type : "";
    let item_desc = i.item_desc != null ? i.item_desc : "";
    let item = i.item != null ? i.item : "";

    let itemArr =
      i.item_category.toLocaleLowerCase().includes(category) &&
      i.warehouse.toLocaleLowerCase().includes(warehouse) &&
      (item_type.toLocaleLowerCase().includes(search) ||
        item_desc.toLocaleLowerCase().includes(search) ||
        item.toLocaleLowerCase().includes(search));

    return itemArr;
  });

  const conditionalRowStyles = [
    {
      when: (row: any) => row.is_excess == 1,
      style: {
        backgroundColor: "#91C8E4",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row: any) => row.is_excess == 0,
      style: {
        backgroundColor: "#ffffff",
        color: "#000000",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
  ];

  return (
    <div>
      <Box bg={"white"} boxShadow="xs" py="1">
        <Flex px={{ base: 4 }} sx={flexDesign}>
          <HStack
            flex={{ base: 10, lg: 1 }}
            direction={"row"}
            spacing={2}
            justify={"flex-start"}
          >
            <Text sx={titleDesign}>Inventory List</Text>

            <IconButton
              as={Link}
              variant={"outline"}
              colorScheme={"blue"}
              borderRadius={"0px"}
              aria-label="Add Item"
              size="sm"
              title="Click this buton to add another Inventory Item"
              to={"/inventories/create"}
              icon={<AddIcon />}
              isLoading={loading}
              // spinnerPlacement="end"
            />
            <IconButton
              variant={"outline"}
              colorScheme={"red"}
              borderRadius={"0px"}
              aria-label="Delete Item"
              size="sm"
              title="Click this buton to delete Inventory Items"
              icon={<DeleteIcon />}
              onClick={deleteItem}
              isLoading={loading}
              // spinnerPlacement="end"
            />
            <Select
              placeholder="Select Category"
              size="sm"
              onChange={handleCategory}
            >
              {options.map((option) => (
                <option key={option.text} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Select Warehouse"
              size="sm"
              onChange={handleWarehouse}
            >
              {warehouseOption.map((whs: any) => (
                <option key={whs.text} value={whs.value}>
                  {whs.text}
                </option>
              ))}
            </Select>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search Item"
                size={"sm"}
                w={"100%"}
                onChange={handleSearch}
              />
            </InputGroup>
          </HStack>
        </Flex>
      </Box>

      <Box pt={1}>
        <DataTable
          columns={columns}
          data={filteredItem}
          progressPending={pending}
          pagination
          selectableRows
          responsive
          striped
          dense
          paginationPerPage={20}
          defaultSortFieldId={12}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          onSelectedRowsChange={handleSelectRow}
        />
      </Box>
    </div>
  );
};

export default InventoryList;
