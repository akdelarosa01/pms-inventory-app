import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSave, FaTimes } from "react-icons/fa";
import InventoryService from "../../../services/InventoryService";
import MessageService from "../../../services/MessageService";
import ThemeService from "../../../services/ThemeService";
import HelperService from "../../../services/HelperService";
import {
  Box,
  Stack,
  HStack,
  Button,
  Text,
  Container,
  Select,
  Input,
  Checkbox,
  FormControl,
  FormLabel,
  Divider,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import User from "../../../auth/User";
import InputErrorMessage from "../../InputErrorMessage";
import InputErrorInterface from "../../../interfaces/InputErrorInterface";

interface props {
  id: number;
}

const InventoryForm = ({ id }: props) => {
  const _inventory = new InventoryService();
  const _message = new MessageService();
  const _theme = new ThemeService();
  const _helper = new HelperService();

  const [category, setCategory] = useState<string>("");
  const [itemTypeDatalist, setItemTypeDatalist] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dataFetchedRef = useRef<boolean>(false);

  const [id_input, set_id_input] = useState<number>(0);
  const [item_category_input, set_item_category_input] = useState<string>("");
  const [item_type_input, set_item_type_input] = useState<string>("");
  const [item_code_input, set_item_code_input] = useState<string>("");
  const [item_id_input, set_item_id_input] = useState<number>(0);
  const [item_desc_input, set_item_desc_input] = useState<string>("");
  const [warehouse_input, set_warehouse_input] = useState<string>("");
  const [heat_no_input, set_heat_no_input] = useState<string>("");
  const [quantity_input, set_quantity_input] = useState<number>(0);
  const [weight_input, set_weight_input] = useState<number>(0);
  const [supplier_input, set_supplier_input] = useState<string>("");
  const [supplier_heat_no_input, set_supplier_heat_no_input] =
    useState<string>("");
  const [length_input, set_length_input] = useState<number>(0);
  const [is_excess_input, set_is_excess_input] = useState<boolean>(false);
  const [width_input, set_width_input] = useState<number>(0);
  const [weight_received_input, set_weight_received_input] =
    useState<number>(0);
  const [lot_no_input, set_lot_no_input] = useState<string>("");
  const [sc_no_input, set_sc_no_input] = useState<string>("");
  const [material_used_input, set_material_used_input] = useState<string>("");

  const [item_category_disable, set_item_category_disability] =
    useState<boolean>(false);
  const [item_type_disable, set_item_type_disability] =
    useState<boolean>(false);
  const [item_code_disable, set_item_code_disability] =
    useState<boolean>(false);

  // Error State
  let inputErrorObj: InputErrorInterface = {
    item_category: false,
    item_category_msg: "",
    item_type: false,
    item_type_msg: "",
    item_code: false,
    item_code_msg: "",
    warehouse: false,
    warehouse_msg: "",
    heat_no: false,
    heat_no_msg: "",
    quantity: false,
    quantity_msg: "",
    length: false,
    length_msg: "",
    weight: false,
    weight_msg: "",
    width: false,
    width_msg: "",
    weight_received: false,
    weight_received_msg: "",
  };
  const [hasInputError, setHasInputError] =
    useState<InputErrorInterface>(inputErrorObj);

  let filteredItemType = [];

  const options = [
    { value: "RAW MATERIAL", text: "Raw Material", color: "color: #444444" },
    {
      value: "FINISHED GOODS",
      text: "Finished Goods",
      color: "color: #444444",
    },
    { value: "CRUDE", text: "Crude", color: "color: #444444" },
  ];

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const material = _helper.selectAllElement("material");
    const product = _helper.selectAllElement("product");
    const plate = _helper.selectAllElement("plate");

    for (let i = 0; i < material.length; i++) {
      material[i].style.display = "none";
    }

    for (let i = 0; i < product.length; i++) {
      product[i].style.display = "none";
    }

    for (let i = 0; i < plate.length; i++) {
      plate[i].style.display = "none";
    }

    getItemTypes();
  });

  // Functions
  const getItemTypes = async () => {
    setLoading(true);
    await _inventory
      .itemTypes()
      .then(({ data }) => {
        setItemTypeDatalist(data);

        if (id != 0) {
          getItemDetails(id);
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
  };

  const getItemDetails = async (inventory_id: number) => {
    setLoading(true);

    try {
      await _inventory
        .details(inventory_id)
        .then(({ data }) => {
          set_id_input(data.id == null ? 0 : data.id);
          set_item_category_input(
            data.item_category == null ? "" : data.item_category
          );
          set_item_type_input(data.item_type != null ? data.item_type : "");
          set_item_code_input(data.item_code != null ? data.item_code : "");
          set_item_id_input(data.item_id != null ? data.item_id : 0);
          set_item_desc_input(data.item_desc != null ? data.item_desc : "");
          set_warehouse_input(data.warehouse != null ? data.warehouse : "");
          set_heat_no_input(data.heat_no != null ? data.heat_no : "");
          set_quantity_input(data.quantity != null ? data.quantity : 0);
          set_weight_input(data.weight != null ? data.weight : 0);

          set_supplier_input(data.supplier != null ? data.supplier : "");
          set_supplier_heat_no_input(
            data.supplier_heat_no != null ? data.supplier_heat_no : ""
          );
          set_length_input(data.length != null ? data.length : 0);

          set_is_excess_input(data.is_excess ? true : false);

          if (data.is_excess == 1) {
            formPlateDisplay(true);
          } else {
            formPlateDisplay(false);
          }

          set_width_input(data.width != null ? data.width : 0);
          set_weight_received_input(
            data.weight_received != null ? data.weight_received : 0
          );
          set_lot_no_input(data.lot_no != null ? data.lot_no : "");
          set_sc_no_input(data.sc_no != null ? data.sc_no : "");
          set_material_used_input(
            data.material_used != null ? data.material_used : ""
          );

          formDisplayByCategory(data.item_category, "EDIT");

          const material = _helper.selectAllElement("material");
          const product = _helper.selectAllElement("product");
          const plate = _helper.selectAllElement("plate");

          if (
            data.item_type.toLocaleLowerCase().includes("plate") &&
            data.item_category == "RAW MATERIAL"
          ) {
            for (let i = 0; i < plate.length; i++) {
              plate[i].style.display = "block";
              product[i].style.display = "none";
            }
          } else {
            if (data.item_category == "RAW MATERIAL") {
              for (let i = 0; i < material.length; i++) {
                material[i].style.display = "block";
                product[i].style.display = "none";
                plate[i].style.display = "none";
              }
            } else {
              for (let i = 0; i < product.length; i++) {
                product[i].style.display = "block";
                material[i].style.display = "none";
                plate[i].style.display = "none";
              }
            }
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
  };

  const save = () => {
    const param: any = {
      id: id,
      item_category: item_category_input,
      item_type: item_type_input,
      item_code: item_code_input,
      item_id: item_id_input,
      item_desc: item_desc_input,
      warehouse: warehouse_input,
      heat_no: heat_no_input,
      quantity: quantity_input,
      weight: weight_input,
      supplier: supplier_input,
      supplier_heat_no: supplier_heat_no_input,
      length: length_input,
      is_excess: is_excess_input,
      width: width_input,
      weight_received: weight_received_input,
      lot_no: lot_no_input,
      sc_no: sc_no_input,
      material_used: material_used_input,
      user_id: User.id,
    };

    setLoading(true);

    if (id && id > 0) {
      _inventory
        .update(param)
        .then(({ data }) => {
          _message.messageRedirect(data, "/inventories");
        })
        .catch((err) => {
          if (err.response != undefined) {
            if (err.response.data.hasOwnProperty("errors")) {
              handleErrMsgShow(err.response.data.errors);
            } else {
              const errMessage = err.response.data;
              _message.error(errMessage);
            }
          }
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      _inventory
        .add(param)
        .then(({ data }) => {
          _message.messageRedirect(data, "/inventories");
        })
        .catch((err) => {
          if (err.response != undefined) {
            if (err.response.data.hasOwnProperty("errors")) {
              handleErrMsgShow(err.response.data.errors);
            } else {
              const errMessage = err.response.data;
              _message.error(errMessage);
            }
          }
        })
        .then(() => {
          setLoading(false);
        });
    }
  };

  const handleErrMsgShow = (errors: any) => {
    const errKeys = Object.keys(errors);

    errKeys.map((errKey: any) => {
      const err: any = errors[errKey];

      switch (errKey) {
        case "item_category":
          inputErrorObj.item_category = true;
          inputErrorObj.item_category_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "item_type":
          inputErrorObj.item_type = true;
          inputErrorObj.item_type_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "item_code":
          inputErrorObj.item_code = true;
          inputErrorObj.item_code_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "warehouse":
          inputErrorObj.warehouse = true;
          inputErrorObj.warehouse_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "heat_no":
          inputErrorObj.heat_no = true;
          inputErrorObj.heat_no_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "quantity":
          inputErrorObj.quantity = true;
          inputErrorObj.quantity_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "length":
          inputErrorObj.length = true;
          inputErrorObj.length_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "weight":
          inputErrorObj.weight = true;
          inputErrorObj.weight_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        case "width":
          inputErrorObj.width = true;
          inputErrorObj.width_msg = err[0];
          setHasInputError(inputErrorObj);
          break;

        default:
          inputErrorObj.weight_received = true;
          inputErrorObj.weight_received_msg = err[0];
          setHasInputError(inputErrorObj);
          break;
      }
    });
  };

  // Event Functions
  const handleMaterial = (e: any) => {
    const item_category = item_category_input;
    const item_type = e.target.value.toLocaleLowerCase();
    const excess = _helper.selectElementID("excess_div");
    const plate = _helper.selectAllElement("plate");

    if (
      item_type.toLocaleLowerCase().includes("plate") &&
      item_category == "RAW MATERIAL"
    ) {
      for (let i = 0; i < plate.length; i++) {
        plate[i].style.display = "block";
      }
    } else {
      for (let i = 0; i < plate.length; i++) {
        plate[i].style.display = "none";
      }
    }
    excess.style.display = "none";
  };

  const handleCategoryOnChange = (e: any) => {
    formDisplayByCategory(e.target.value, "ADD");
  };

  const formDisplayByCategory = (
    selectedCategory: string,
    operation: string
  ) => {
    const categ = selectedCategory.toLocaleLowerCase();
    setCategory(categ);
    set_item_category_input(selectedCategory);

    const material = _helper.selectAllElement("material");
    const product = _helper.selectAllElement("product");

    switch (categ) {
      case "finished goods":
      case "crude":
        for (let i = 0; i < material.length; i++) {
          material[i].style.display = "none";
        }

        for (let i = 0; i < product.length; i++) {
          product[i].style.display = "block";
        }
        break;

      case "raw material":
        for (let i = 0; i < material.length; i++) {
          material[i].style.display = "block";
        }

        for (let i = 0; i < product.length; i++) {
          product[i].style.display = "none";
        }
        break;

      default:
        for (let i = 0; i < product.length; i++) {
          product[i].style.display = "none";
        }

        for (let i = 0; i < material.length; i++) {
          material[i].style.display = "none";
        }
        break;
    }

    if (operation == "ADD") {
      set_item_category_input(selectedCategory);

      if (selectedCategory) {
        set_item_type_disability(false);
        set_item_code_disability(false);

        set_id_input(0);
        set_item_type_input("");
        set_item_code_input("");
        set_item_id_input(0);
        set_item_desc_input("");
        set_warehouse_input("");
        set_heat_no_input("");
        set_quantity_input(0);
        set_supplier_input("");
        set_supplier_heat_no_input("");
        set_length_input(0);
        set_is_excess_input(false);
        set_width_input(0);
        set_weight_received_input(0);
        set_lot_no_input("");
        set_sc_no_input("");
        set_material_used_input("");
      } else {
        set_item_type_disability(true);
        set_item_code_disability(true);
      }
    } else {
      set_item_category_disability(true);
      set_item_type_disability(true);
      set_item_code_disability(true);
    }
  };

  const handleItemType = (e: any) => {
    // const tp = e.target.value.toLocaleLowerCase();
    handleMaterial(e);
    // setItemType(tp);

    set_item_type_input(e.target.value);
    set_item_code_input("");
    set_item_id_input(0);
    set_item_desc_input("");
    set_warehouse_input("");
    set_heat_no_input("");
    set_quantity_input(0);
    set_supplier_input("");
    set_supplier_heat_no_input("");
    set_length_input(0);
    // is_excess_input.disabled = false;
    set_width_input(0);
    set_weight_received_input(0);
    set_lot_no_input("");
    set_sc_no_input("");
    set_material_used_input("");
  };

  const handleItemCodeChange = async (e: any) => {
    const item_code = e.target.value;
    set_item_code_input(item_code);

    const item_type = item_type_input;
    const param = {
      item_type: item_type,
      item_code: item_code,
    };

    if (item_code != "") {
      setLoading(true);

      await _inventory
        .items(param)
        .then(({ data }) => {
          if (data && data.hasOwnProperty("id")) {
            set_item_id_input(data.id);
            set_item_desc_input(data.item_desc);

            inputErrorObj.item_code = false;
            inputErrorObj.item_code_msg = "";
            setHasInputError(inputErrorObj);
          }

          if (!data) {
            inputErrorObj.item_code = true;
            inputErrorObj.item_code_msg =
              "Item Code doesn't match with Item Type.";
            setHasInputError(inputErrorObj);
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
    }
  };

  const handleIsExcessCheck = (e: any) => {
    formPlateDisplay(e.target.checked);
  };

  const formPlateDisplay = (ischecked: boolean) => {
    const length = _helper.selectElementID("length_div");
    const width = _helper.selectElementID("width_div");
    const weight_received = _helper.selectElementID("weight_received_div");
    const not_excess = _helper.selectElementID("not_excess_div");
    const excess = _helper.selectElementID("excess_div");

    if (ischecked) {
      length.style.display = "none";
      width.style.display = "none";
      weight_received.style.display = "none";
      not_excess.style.display = "none";
      excess.style.display = "block";
    } else {
      length.style.display = "block";
      width.style.display = "block";
      weight_received.style.display = "block";
      not_excess.style.display = "block";
      excess.style.display = "none";
    }
  };

  const handleInputOnChange = (e: any) => {
    switch (e.target.name) {
      case "heat_no":
        set_heat_no_input(e.target.value);
        break;
      case "quantity":
        set_quantity_input(e.target.value);
        break;
      case "weight":
        set_weight_input(e.target.value);
        break;
      case "supplier":
        set_supplier_input(e.target.value);
        break;
      case "supplier_heat_no":
        set_supplier_heat_no_input(e.target.value);
        break;
      case "length":
        set_length_input(e.target.value);
        break;
      case "weight_received":
        set_weight_received_input(e.target.value);
        break;
      case "width":
        set_width_input(e.target.value);
        break;
      case "lot_no":
        set_lot_no_input(e.target.value);
        break;
      case "sc_no":
        set_sc_no_input(e.target.value);
        break;
      case "material_used":
        set_material_used_input(e.target.value);
        break;
    }
  };

  filteredItemType = itemTypeDatalist.filter((i: InventoryInterface) => {
    let item_category = i.item_category != null ? i.item_category : "";
    let itemTypeArr = item_category.toLocaleLowerCase().includes(category);
    return itemTypeArr;
  });

  return (
    <div>
      <form className="" id="frmInventory">
        <Container sx={_theme.containerDesign}>
          <Card>
            <CardHeader>
              <HStack
                flex={{ base: 6, lg: 2 }}
                direction={"row"}
                spacing={2}
                justify={"flex-end"}
              >
                <Button
                  variant={"outline"}
                  colorScheme={"blue"}
                  borderRadius={"0px"}
                  aria-label="Save"
                  size="sm"
                  title="Click this buton to save Inventory Item details"
                  isLoading={loading}
                  spinnerPlacement="end"
                  type="button"
                  onClick={save}
                  leftIcon={<FaSave />}
                >
                  Save
                </Button>
                <Button
                  as={Link}
                  to={"/inventories"}
                  variant={"outline"}
                  colorScheme={"red"}
                  borderRadius={"0px"}
                  aria-label="Cancel"
                  size="sm"
                  title="Click this buton to cancel transaction"
                  isLoading={loading}
                  spinnerPlacement="end"
                  leftIcon={<FaTimes />}
                  type="button"
                >
                  Cancel
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text sx={_theme.titleFormFont}>Item Details</Text>
              <Divider orientation="horizontal" mb={5} />

              <input
                type="hidden"
                id="id"
                name="id"
                readOnly
                value={id_input}
              />

              <Stack spacing={3} className="item_info">
                <HStack spacing={3} mb={5}>
                  <Box flex={_theme.boxFlexDesign}>
                    <FormControl
                      id="item_category"
                      isRequired
                      mb={2}
                      isInvalid={hasInputError.item_category}
                    >
                      <FormLabel>Item Category</FormLabel>
                      <Select
                        placeholder="Select Item Category"
                        name="item_category"
                        size="sm"
                        onChange={handleCategoryOnChange}
                        isDisabled={item_category_disable}
                        value={item_category_input}
                      >
                        {options.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </Select>
                      <InputErrorMessage
                        hasError={hasInputError.item_category}
                        errorMessage={hasInputError.item_category_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box flex={_theme.boxFlexDesign}>
                    <FormControl
                      id="item_type"
                      isRequired
                      mb={2}
                      isInvalid={hasInputError.item_type}
                    >
                      <FormLabel>Item Type</FormLabel>
                      <Select
                        name="item_type"
                        placeholder="Material Type / Product Line"
                        size="sm"
                        onChange={handleItemType}
                        isDisabled={item_type_disable}
                        value={item_type_input}
                      >
                        {filteredItemType.map((i: any) => (
                          <option
                            key={i.item_category + "-" + i.item_type}
                            value={i.item_type}
                          >
                            {i.item_type}
                          </option>
                        ))}
                      </Select>
                      <InputErrorMessage
                        hasError={hasInputError.item_type}
                        errorMessage={hasInputError.item_type_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box flex={_theme.boxFlexDesign}>
                    <input
                      type="hidden"
                      name="item_id"
                      id="item_id"
                      readOnly
                      value={item_id_input}
                    />
                    <FormControl
                      id="item_code"
                      isRequired
                      mb={2}
                      isInvalid={hasInputError.item_code}
                    >
                      <FormLabel>Item Code</FormLabel>

                      <Input
                        onChange={handleItemCodeChange}
                        placeholder="Item Code"
                        size="sm"
                        resize="none"
                        name="item_code"
                        value={item_code_input}
                        readOnly={item_code_disable}
                      />
                      <InputErrorMessage
                        hasError={hasInputError.item_code}
                        errorMessage={hasInputError.item_code_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box flex={_theme.boxFlexDesign}>
                    <FormControl id="item_desc" isRequired mb={2}>
                      <FormLabel>Description</FormLabel>
                      <Input
                        placeholder="Item Description"
                        size="sm"
                        resize="none"
                        name="item_desc"
                        value={item_desc_input}
                        readOnly={true}
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </Stack>

              <Text sx={_theme.titleFormFont}>Inventory Details</Text>
              <Divider orientation="horizontal" mb={5} />

              <Stack>
                <HStack spacing={3} mb={5}>
                  <Box w="100%">
                    <FormControl
                      id="warehouse"
                      mb={2}
                      isInvalid={hasInputError.warehouse}
                    >
                      <FormLabel>Warehouse</FormLabel>
                      <Input
                        name="warehouse"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={warehouse_input}
                      />
                      <InputErrorMessage
                        hasError={hasInputError.warehouse}
                        errorMessage={hasInputError.warehouse_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box w="100%">
                    <FormControl
                      id="heat_no"
                      mb={2}
                      isInvalid={hasInputError.heat_no}
                    >
                      <FormLabel>Heat Number</FormLabel>
                      <Input
                        name="heat_no"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={heat_no_input}
                      />
                      <InputErrorMessage
                        hasError={hasInputError.heat_no}
                        errorMessage={hasInputError.heat_no_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box w="100%" id="not_excess_div">
                    <FormControl
                      id="quantity"
                      mb={2}
                      isInvalid={hasInputError.quantity}
                    >
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        type="number"
                        name="quantity"
                        size="sm"
                        textAlign={"right"}
                        placeholder="0"
                        onChange={handleInputOnChange}
                        value={quantity_input}
                      />
                      <InputErrorMessage
                        hasError={hasInputError.quantity}
                        errorMessage={hasInputError.quantity_msg}
                      />
                    </FormControl>
                  </Box>

                  <Box w="100%" id="excess_div" className="plate">
                    <FormControl
                      id="weight"
                      mb={2}
                      isInvalid={hasInputError.weight}
                    >
                      <FormLabel>Weight</FormLabel>
                      <Input
                        type="decimal"
                        name="weight"
                        size="sm"
                        textAlign={"right"}
                        placeholder="0.00"
                        onChange={handleInputOnChange}
                        value={weight_input}
                      />
                      <InputErrorMessage
                        hasError={hasInputError.weight}
                        errorMessage={hasInputError.weight_msg}
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </Stack>

              <Stack className="material">
                <Stack direction={["column", "row"]} spacing={3}>
                  <Box w="100%">
                    <FormControl id="supplier" mb={2}>
                      <FormLabel>Supplier</FormLabel>
                      <Input
                        name="supplier"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={supplier_input}
                      />
                    </FormControl>

                    <FormControl id="supplier_heat_no" mb={2}>
                      <FormLabel>Supplier Heat No.</FormLabel>
                      <Input
                        name="supplier_heat_no"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={supplier_heat_no_input}
                      />
                    </FormControl>

                    <Box id="length_div">
                      <FormControl
                        id="length"
                        mb={2}
                        isInvalid={hasInputError.length}
                      >
                        <FormLabel>Length</FormLabel>
                        <Input
                          type="decimal"
                          name="length"
                          size="sm"
                          textAlign={"right"}
                          placeholder="0.00"
                          onChange={handleInputOnChange}
                          value={length_input}
                        />
                        <InputErrorMessage
                          hasError={hasInputError.length}
                          errorMessage={hasInputError.length_msg}
                        />
                      </FormControl>
                    </Box>
                  </Box>

                  <Box w="100%">
                    <Box id="weight_received_div">
                      <FormControl
                        id="weight_received"
                        mb={2}
                        isInvalid={hasInputError.weight_received}
                      >
                        <FormLabel>Weight Received</FormLabel>
                        <Input
                          type="decimal"
                          name="weight_received"
                          size="sm"
                          textAlign={"right"}
                          placeholder="0.00"
                          onChange={handleInputOnChange}
                          value={weight_received_input}
                        />
                        <InputErrorMessage
                          hasError={hasInputError.weight_received}
                          errorMessage={hasInputError.weight_received_msg}
                        />
                      </FormControl>
                    </Box>

                    <Box id="is_excess_div">
                      <FormControl
                        mb={4}
                        className="plate"
                        onChange={handleIsExcessCheck}
                        id="is_excess"
                      >
                        <FormLabel>Excess Material?</FormLabel>
                        <Checkbox name="is_excess" isChecked={is_excess_input}>
                          Yes
                        </Checkbox>
                      </FormControl>
                    </Box>

                    <Box id="width_div">
                      <FormControl
                        mb={2}
                        className="plate"
                        id="width"
                        isInvalid={hasInputError.width}
                      >
                        <FormLabel>Width</FormLabel>
                        <Input
                          type="decimal"
                          name="width"
                          size="sm"
                          textAlign={"right"}
                          placeholder="0.00"
                          onChange={handleInputOnChange}
                          value={width_input}
                        />
                        <InputErrorMessage
                          hasError={hasInputError.width}
                          errorMessage={hasInputError.width_msg}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Stack>
              </Stack>

              <Stack className="product">
                <Stack direction={["column", "row"]} spacing={3}>
                  <Box w="50%">
                    <FormControl id="lot_no" mb={2}>
                      <FormLabel>Lot Number</FormLabel>
                      <Input
                        name="lot_no"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={lot_no_input}
                      />
                    </FormControl>

                    <FormControl id="sc_no" mb={2}>
                      <FormLabel>SC Number</FormLabel>
                      <Input
                        name="sc_no"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={sc_no_input}
                      />
                    </FormControl>

                    <FormControl id="material_used" mb={2}>
                      <FormLabel>Material used {"(Item Code)"}</FormLabel>
                      <Input
                        name="material_used"
                        size="sm"
                        onChange={handleInputOnChange}
                        value={material_used_input}
                      />
                    </FormControl>
                  </Box>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default InventoryForm;
