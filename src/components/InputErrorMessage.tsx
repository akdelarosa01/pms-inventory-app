import { FormErrorMessage } from "@chakra-ui/react";
import ThemeService from "../services/ThemeService";

interface propsErr {
  hasError: boolean;
  errorMessage: string;
}

const InputErrorMessage = ({ hasError, errorMessage }: propsErr) => {
  const _theme = new ThemeService();

  return hasError ? (
    <FormErrorMessage sx={_theme.errorMsgDesign}>
      {errorMessage}
    </FormErrorMessage>
  ) : (
    ""
  );
};

export default InputErrorMessage;
