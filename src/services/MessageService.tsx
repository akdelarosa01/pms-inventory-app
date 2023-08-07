import { useToast, UseToastOptions, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WarningIcon } from "@chakra-ui/icons";

interface MeasageObj {
  status: UseToastOptions["status"];
  message: string;
}

interface ErrorMsgObj {
  file: string;
  line: string;
  message: string;
}

class MessageService {
  toast = useToast();
  navigate = useNavigate();

  /**
   * Message with redirect
   * @param {object} data
   * @param {string} url
   */
  messageRedirect = (data: MeasageObj, url: string = "") => {
    switch (data.status) {
      case "success":
        this.messageToast(data.status, "Success", data.message);
        if (url != "") {
          this.navigate(url);
        }
        break;
      case "warning":
        this.messageToast(data.status, "Warning", data.message);
        break;
      case "error":
        this.messageToast(data.status, "Error", data.message);
        break;

      default:
        break;
    }
  };

  /**
   * Message Toast
   * @param {string} mstatus
   * @param {string} title
   * @param {string} message
   */
  messageToast = (
    mstatus: UseToastOptions["status"],
    title: String,
    message: String
  ) => {
    this.toast({
      title: title,
      description: message,
      status: mstatus,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };

  /**
   * Error Message
   * @param {object} content
   */
  error = (content: ErrorMsgObj) => {
    this.toast({
      position: "top",
      variant: "subtle",
      isClosable: true,
      render: () => (
        <Box color="black" p={3} bg="red.200" borderRadius={4}>
          <WarningIcon color="black" />{" "}
          <Text color="black" fontSize="16px" as="b">
            Error!
          </Text>
          <br />
          <Text color="black" fontSize="13px">
            <Text as="b">File: </Text>
            {content.file}
          </Text>
          <Text color="black" fontSize="13px">
            <Text as="b">Line: </Text>
            {content.line}
          </Text>
          <Text color="black" fontSize="13px">
            <Text as="b">Message: </Text>
            {content.message}
          </Text>
        </Box>
      ),
    });
  };
}

export default MessageService;
