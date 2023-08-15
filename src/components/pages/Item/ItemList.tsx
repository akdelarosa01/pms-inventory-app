import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
import ItemService from "../../../services/ItemService";
import MessageService from "../../../services/MessageService";
import User from "../../../auth/User";

const ItemList = () => {
  const mySwal = withReactContent(Swal);
  const [items, setItems] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dataFetchedRef = useRef<boolean>(false);

  const _item = new ItemService();
  const _message = new MessageService();

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
  const colObj: any[] = useMemo(() => _item.itemColumn, []);

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

  const getItemList = async () => {
    setPending(true);
    setColumns(colObj);

    await _item
      .allData()
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        if (err.response != undefined) {
          const errMessage = err.response.data;
          _message.error(errMessage);
        }
      })
      .catch((err) => {
        if (err.response != undefined) {
          const errMessage = err.response.data;
          _message.error(errMessage);
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getItemList();
  }, []);

  const deleteItem = () => {
    const id: number[] = [];

    selectedData.map((sdata: any) => {
      id.push(sdata.id);
    });

    if (id.length > 0) {
      mySwal
        .fire({
          title: "Do you want to delete these Items?",
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
              _item
                .delete(param)
                .then((response) => {
                  try {
                    _message.messageRedirect(response.data);
                    setItems(response.data.data);
                  } catch (error) {
                    console.log(error);
                  }
                })
                .catch((err) => {
                  if (err.response != undefined) {
                    const errMessage = err.response.data;
                    _message.error(errMessage);
                  }
                })
                .then(() => {
                  setLoading(false);
                });
            } catch (error) {
              console.log(error);
            }
          } else if (result.isDenied) {
            Swal.fire("You chose not to delete the item.", "", "info");
          }
        });
    } else {
      _message.messageRedirect({
        message: "Please select at least 1 Item.",
        status: "warning",
      });
    }
  };

  const handleCategory = (e: any) => {
    const categ = e.target.value.toLocaleLowerCase();
    setCategory(categ);
  };

  const handleSearch = (e: any) => {
    const ss = e.target.value.toLocaleLowerCase();
    setSearch(ss);
  };

  filteredItem = items.filter((i: any) => {
    let item_type = i.item_type != null ? i.item_type : "";
    let item_desc = i.item_desc != null ? i.item_desc : "";
    let item = i.item != null ? i.item : "";
    let schedule_class = i.schedule_class != null ? i.schedule_class : "";
    let alloy = i.alloy != null ? i.alloy : "";
    let size = i.size != null ? i.size : "";
    let std_material_used =
      i.std_material_used != null ? i.std_material_used : "";
    let finished_code = i.finished_code != null ? i.finished_code : "";
    let finished_desc = i.finished_desc != null ? i.finished_desc : "";
    let itemArr =
      i.item_category.toLocaleLowerCase().includes(category) &&
      (item_type.toLocaleLowerCase().includes(search) ||
        item_desc.toLocaleLowerCase().includes(search) ||
        item.toLocaleLowerCase().includes(search) ||
        schedule_class.toLocaleLowerCase().includes(search) ||
        alloy.toLocaleLowerCase().includes(search) ||
        size.toLocaleLowerCase().includes(search) ||
        std_material_used.toLocaleLowerCase().includes(search) ||
        finished_code.toLocaleLowerCase().includes(search) ||
        finished_desc.toLocaleLowerCase().includes(search));

    return itemArr;
  });

  return (
    <div>
      <Box bg={"white"} boxShadow="xs" py="1">
        <Flex px={{ base: 4 }} sx={flexDesign}>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <HStack
              flex={{ base: 4, md: 0 }}
              justify={"flex-start"}
              direction={"row"}
              spacing={1}
            >
              <Text sx={titleDesign}>Item List</Text>
            </HStack>
          </Flex>

          <HStack
            flex={{ base: 10, lg: 1 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={2}
          >
            <IconButton
              as={Link}
              variant={"outline"}
              colorScheme={"blue"}
              borderRadius={"0px"}
              aria-label="Add Item"
              size="sm"
              title="Click this buton to add an Item"
              to={"/items/new"}
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
              title="Click this buton to delete Items"
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
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="tel"
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
          defaultSortFieldId="updated_at"
          defaultSortAsc={false}
          onSelectedRowsChange={handleSelectRow}
        />
      </Box>
    </div>
  );
};

export default ItemList;
