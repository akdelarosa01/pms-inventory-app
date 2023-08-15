import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSave, FaTimes } from "react-icons/fa";
import ItemService from "../../../services/ItemService";
import MessageService from "../../../services/MessageService";
import ThemeService from "../../../services/ThemeService";
import HelperService from "../../../services/HelperService";
import User from "../../../auth/User";
import InputErrorMessage from "../../InputErrorMessage";
import ItemInputErrorInterface from "../../../interfaces/ItemInputErrorInterface";
import {
  FormControl,
  FormLabel,
  Container,
  Box,
  Input,
  Select,
  Textarea,
  Button,
  HStack,
  Stack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

interface props {
  id: number;
}

const ItemForm = ({ id }: props) => {
  const options = [
    { value: "RAW MATERIAL", text: "Raw Material", color: "color: #444444" },
    {
      value: "FINISHED GOODS",
      text: "Finished Goods",
      color: "color: #444444",
    },
    { value: "CRUDE", text: "Crude", color: "color: #444444" },
  ];

  const [loading, setLoading] = useState(false);
  const [disable, setDisabled] = useState(true);
  const dataFetchedRef = useRef<boolean>(false);

  const [id_input, set_id_input] = useState<number>(0);
  const [item_category_input, set_item_category_input] = useState<string>("");
  const [item_type_input, set_item_type_input] = useState<string>("");
  const [item_code_input, set_item_code_input] = useState<string>("");
  const [item_desc_input, set_item_desc_input] = useState<string>("");
  const [item_input, set_item_input] = useState<string>("");
  const [schedule_class_input, set_schedule_class_input] = useState<string>("");
  const [alloy_input, set_alloy_input] = useState<string>("");
  const [size_input, set_size_input] = useState<string>("");
  const [weight_input, set_weight_input] = useState<number>(0);
  const [cut_weight_input, set_cut_weight_input] = useState<number>(0);
  const [cut_length_input, set_cut_length_input] = useState<number>(0);
  const [cut_width_input, set_cut_width_input] = useState<number>(0);
  const [std_material_used_input, set_std_material_used_input] =
    useState<string>("");
  const [finished_code_input, set_finished_code_input] = useState<string>("");
  const [finished_desc_input, set_finished_desc_input] = useState<string>("");

  let ItemInputrrorObj: ItemInputErrorInterface = {
    item_category: false,
    item_category_msg: "",
    item_type: false,
    item_type_msg: "",
    item_code: false,
    item_code_msg: "",
    item_desc: false,
    item_desc_msg: "",
    item: false,
    item_msg: "",
    schedule_class: false,
    schedule_class_msg: "",
    alloy: false,
    alloy_msg: "",
    size: false,
    size_msg: "",
    weight: false,
    weight_msg: "",
    cut_weight: false,
    cut_weight_msg: "",
    cut_length: false,
    cut_length_msg: "",
    cut_width: false,
    cut_width_msg: "",
    std_material_used: false,
    std_material_used_msg: "",
    finished_code: false,
    finished_code_msg: "",
    finished_desc: false,
    finished_desc_msg: "",
  };
  const [hasInputError, setHasInputError] =
    useState<ItemInputErrorInterface>(ItemInputrrorObj);

  const _item = new ItemService();
  const _message = new MessageService();
  const _helper = new HelperService();
  const _theme = new ThemeService();

  const handleCategoryChange = (ev: any) => {
    set_item_category_input(ev.target.value);
    changeItemCategoryView(ev.target.value);
  };

  const changeItemCategoryView = (item_category_value: string) => {
    const crude = _helper.selectAllElement("crude");
    const product = _helper.selectAllElement("product");
    const checker = ["CRUDE", "FINISHED GOODS"];

    setDisabled(true);
    if (item_category_value != "") {
      setDisabled(false);
    }

    if (!checker.includes(item_category_value)) {
      // Materials
      for (let i = 0; i < product.length; i++) {
        product[i].style.display = "none";
      }

      for (let i = 0; i < crude.length; i++) {
        crude[i].style.display = "none";
      }
    } else {
      // Produtcs
      for (let i = 0; i < product.length; i++) {
        product[i].style.display = "block";
      }

      if (item_category_value == "CRUDE") {
        for (let i = 0; i < crude.length; i++) {
          crude[i].style.display = "block";
        }
      } else {
        for (let i = 0; i < crude.length; i++) {
          crude[i].style.display = "none";
        }
      }
    }
  };

  const save = () => {
    const param = {
      id: id_input,
      item_category: item_category_input,
      item_type: item_type_input,
      item_code: item_code_input,
      item_desc: item_desc_input,
      item: item_input,
      schedule_class: schedule_class_input,
      alloy: alloy_input,
      size: size_input,
      weight: weight_input,
      cut_weight: cut_weight_input,
      cut_length: cut_length_input,
      cut_width: cut_width_input,
      std_material_used: std_material_used_input,
      finished_code: finished_code_input,
      finished_desc: finished_desc_input,
      user_id: User.id,
    };
    setLoading(true);

    if (id > 0) {
      _item
        .update(param)
        .then(({ data }) => {
          _message.messageRedirect(data, "/items");
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
        .finally(() => {
          setLoading(false);
        });
    } else {
      _item
        .add(param)
        .then(({ data }) => {
          _message.messageRedirect(data, "/items");
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
        .finally(() => {
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
          ItemInputrrorObj.item_category = true;
          ItemInputrrorObj.item_category_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "item_type":
          ItemInputrrorObj.item_type = true;
          ItemInputrrorObj.item_type_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "item_code":
          ItemInputrrorObj.item_code = true;
          ItemInputrrorObj.item_code_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "item_desc":
          ItemInputrrorObj.item_desc = true;
          ItemInputrrorObj.item_desc_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "item":
          ItemInputrrorObj.item = true;
          ItemInputrrorObj.item_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "schedule_class":
          ItemInputrrorObj.schedule_class = true;
          ItemInputrrorObj.schedule_class_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "alloy":
          ItemInputrrorObj.alloy = true;
          ItemInputrrorObj.alloy_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "size":
          ItemInputrrorObj.size = true;
          ItemInputrrorObj.size_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "weight":
          ItemInputrrorObj.weight = true;
          ItemInputrrorObj.weight_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "cut_weight":
          ItemInputrrorObj.cut_weight = true;
          ItemInputrrorObj.cut_weight_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "cut_length":
          ItemInputrrorObj.cut_length = true;
          ItemInputrrorObj.cut_length_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "cut_width":
          ItemInputrrorObj.cut_width = true;
          ItemInputrrorObj.cut_width_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "std_material_used":
          ItemInputrrorObj.std_material_used = true;
          ItemInputrrorObj.std_material_used_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        case "finished_code":
          ItemInputrrorObj.finished_code = true;
          ItemInputrrorObj.finished_code_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
        default:
          ItemInputrrorObj.finished_desc = true;
          ItemInputrrorObj.finished_desc_msg = err[0];
          setHasInputError(ItemInputrrorObj);
          break;
      }
    });
  };

  const handleInputOnChange = (e: any) => {
    switch (e.target.name) {
      case "item_type":
        set_item_type_input(e.target.value);
        break;
      case "item_code":
        set_item_code_input(e.target.value);
        break;
      case "item_desc":
        set_item_desc_input(e.target.value);
        break;
      case "item":
        set_item_input(e.target.value);
        break;
      case "schedule_class":
        set_schedule_class_input(e.target.value);
        break;
      case "alloy":
        set_alloy_input(e.target.value);
        break;
      case "size":
        set_size_input(e.target.value);
        break;
      case "weight":
        set_weight_input(e.target.value);
        break;
      case "cut_weight":
        set_cut_weight_input(e.target.value);
        break;
      case "cut_length":
        set_cut_length_input(e.target.value);
        break;
      case "cut_width":
        set_cut_width_input(e.target.value);
        break;
      case "std_material_used":
        set_std_material_used_input(e.target.value);
        break;
      case "finished_code":
        set_finished_code_input(e.target.value);
        break;
      case "finished_desc":
        set_finished_desc_input(e.target.value);
        break;
    }
  };

  const getItemDetails = async (item_id: number) => {
    if (item_id > 0) {
      setLoading(true);
      await _item
        .details(id)
        .then(({ data }) => {
          if (data != null && data.hasOwnProperty("id")) {
            set_id_input(data.id);
            set_item_category_input(data.item_category);
            changeItemCategoryView(data.item_category);

            set_item_type_input(data.item_type);
            set_item_code_input(data.item_code);
            set_item_desc_input(data.item_desc);
            set_item_input(data.item);
            set_schedule_class_input(data.schedule_class);
            set_alloy_input(data.alloy);
            set_size_input(data.size);
            set_weight_input(data.weight);

            setDisabled(true);

            switch (data.item_category) {
              case "RAW MATERIAL":
                break;
              case "FINISHED GOODS":
                set_cut_weight_input(data.cut_weight);
                set_cut_length_input(data.cut_length);
                set_cut_width_input(data.cut_width);
                set_std_material_used_input(data.std_material_used);
                break;
              default:
                set_cut_weight_input(data.cut_weight);
                set_cut_length_input(data.cut_length);
                set_cut_width_input(data.cut_width);
                set_std_material_used_input(data.std_material_used);
                set_finished_code_input(data.finished_code);
                set_finished_desc_input(data.finished_desc);
                break;
            }
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response != undefined) {
            const errMessage = err.response.data;
            _message.error(errMessage);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (id > 0) {
      getItemDetails(id);
    }
  }, []);

  return (
    <div>
      <form className="" id="frmItem">
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
                  type="button"
                  variant={"outline"}
                  colorScheme={"blue"}
                  borderRadius={"0px"}
                  aria-label="Save"
                  size="sm"
                  title="Click this buton to save Item details"
                  isLoading={loading}
                  spinnerPlacement="end"
                  leftIcon={<FaSave />}
                  onClick={save}
                >
                  Save
                </Button>
                <Button
                  as={Link}
                  variant={"outline"}
                  colorScheme={"red"}
                  borderRadius={"0px"}
                  aria-label="Cancel"
                  size="sm"
                  title="Click this buton to cancel transaction"
                  isLoading={loading}
                  spinnerPlacement="end"
                  leftIcon={<FaTimes />}
                  to={"/items"}
                >
                  Cancel
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <input
                type="hidden"
                id="id"
                name="id"
                readOnly
                value={id_input}
              />
              <Stack direction={["column", "row"]} spacing={3}>
                <Box w="100%">
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
                      disabled={disable}
                      onChange={handleCategoryChange}
                      value={item_category_input}
                    >
                      {options.map((option) => (
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

                  <FormControl
                    id="item_type"
                    isRequired
                    mb={2}
                    isInvalid={hasInputError.item_type}
                  >
                    <FormLabel>Item Type</FormLabel>
                    <Input
                      name="item_type"
                      placeholder="Material Type / Product Line"
                      size="sm"
                      disabled={disable}
                      onChange={handleInputOnChange}
                      value={item_type_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.item_type}
                      errorMessage={hasInputError.item_type_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="item_code"
                    isRequired
                    mb={2}
                    isInvalid={hasInputError.item_code}
                  >
                    <FormLabel>Item Code</FormLabel>
                    <Input
                      name="item_code"
                      size="sm"
                      disabled={disable}
                      onChange={handleInputOnChange}
                      value={item_code_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.item_code}
                      errorMessage={hasInputError.item_code_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="item_desc"
                    isRequired
                    mb={2}
                    isInvalid={hasInputError.item_desc}
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Item Description"
                      size="sm"
                      resize="none"
                      name="item_desc"
                      disabled={disable}
                      onChange={handleInputOnChange}
                      value={item_desc_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.item_desc}
                      errorMessage={hasInputError.item_desc_msg}
                    />
                  </FormControl>
                </Box>

                <Box w="100%">
                  <FormControl id="item" mb={2} isInvalid={hasInputError.item}>
                    <FormLabel>Item</FormLabel>
                    <Input
                      name="item"
                      size="sm"
                      disabled={disable}
                      onChange={handleInputOnChange}
                      value={item_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.item}
                      errorMessage={hasInputError.item_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="schedule_class"
                    mb={2}
                    isInvalid={hasInputError.schedule_class}
                  >
                    <FormLabel>Schedule / Class</FormLabel>
                    <Input
                      name="schedule_class"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={schedule_class_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.schedule_class}
                      errorMessage={hasInputError.schedule_class_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="alloy"
                    mb={2}
                    isInvalid={hasInputError.alloy}
                  >
                    <FormLabel>Alloy</FormLabel>
                    <Input
                      name="alloy"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={alloy_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.alloy}
                      errorMessage={hasInputError.alloy_msg}
                    />
                  </FormControl>

                  <FormControl id="size" mb={2} isInvalid={hasInputError.size}>
                    <FormLabel>Size</FormLabel>
                    <Input
                      name="size"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={size_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.size}
                      errorMessage={hasInputError.size_msg}
                    />
                  </FormControl>

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
                      placeholder="0"
                      onChange={handleInputOnChange}
                      value={weight_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.weight}
                      errorMessage={hasInputError.weight_msg}
                    />
                  </FormControl>
                </Box>

                <Box w="100%" className="product">
                  <FormControl
                    id="cut_weight"
                    mb={2}
                    isInvalid={hasInputError.cut_weight}
                  >
                    <FormLabel>Cut Weight</FormLabel>
                    <Input
                      type="decimal"
                      name="cut_weight"
                      size="sm"
                      textAlign={"right"}
                      placeholder="0"
                      onChange={handleInputOnChange}
                      value={cut_weight_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.cut_weight}
                      errorMessage={hasInputError.cut_weight_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="cut_length"
                    mb={2}
                    isInvalid={hasInputError.cut_length}
                  >
                    <FormLabel>Cut Length</FormLabel>
                    <Input
                      type="decimal"
                      name="cut_length"
                      size="sm"
                      textAlign={"right"}
                      placeholder="0"
                      onChange={handleInputOnChange}
                      value={cut_length_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.cut_length}
                      errorMessage={hasInputError.cut_length_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="cut_width"
                    mb={2}
                    isInvalid={hasInputError.cut_width}
                  >
                    <FormLabel>Cut Width</FormLabel>
                    <Input
                      type="decimal"
                      name="cut_width"
                      size="sm"
                      textAlign={"right"}
                      placeholder="0"
                      onChange={handleInputOnChange}
                      value={cut_width_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.cut_width}
                      errorMessage={hasInputError.cut_width_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="std_material_used"
                    mb={2}
                    isInvalid={hasInputError.std_material_used}
                  >
                    <FormLabel>Std. Material Used</FormLabel>
                    <Input
                      name="std_material_used"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={std_material_used_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.std_material_used}
                      errorMessage={hasInputError.std_material_used_msg}
                    />
                  </FormControl>
                </Box>

                <Box w="100%" className="crude">
                  <FormControl
                    id="finished_code"
                    mb={2}
                    isInvalid={hasInputError.finished_code}
                  >
                    <FormLabel>Finished Code</FormLabel>
                    <Input
                      name="finished_code"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={finished_code_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.finished_code}
                      errorMessage={hasInputError.finished_code_msg}
                    />
                  </FormControl>

                  <FormControl
                    id="finished_desc"
                    mb={2}
                    isInvalid={hasInputError.finished_desc}
                  >
                    <FormLabel>Finished Description</FormLabel>
                    <Input
                      name="finished_desc"
                      size="sm"
                      onChange={handleInputOnChange}
                      value={finished_desc_input}
                    />
                    <InputErrorMessage
                      hasError={hasInputError.finished_desc}
                      errorMessage={hasInputError.finished_desc_msg}
                    />
                  </FormControl>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Container>
      </form>
    </div>
  );
};

export default ItemForm;
