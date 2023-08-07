import { useState } from "react";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	useColorModeValue,
} from "@chakra-ui/react";
import User from "../../auth/User";
import { Navigate } from "react-router-dom";
import AxiosService from "../../services/AxiosService";

const Login = () => {

	if (User.loggedIn) {
		return <Navigate to={"/dashboard"}/>
	}
	const [loading, setLoading] = useState(false);

	const handleSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
		setLoading(true);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		
		const loginCredentials = {
			username: formData.get('username'),
			password: formData.get('password')
		}

		AxiosService.post('/login',loginCredentials).then((response) => {
			console.log(response);
			User.authenticated(response.data.user, () => {
				setLoading(false);
				location.href="/dashboard";
			});
		}).finally(() => {
			setLoading(false);
		});
	}
	
  return (
		<Box
			bg={useColorModeValue("white", "gray.700")}
			boxShadow={"lg"}
			width="500px"
			p={8}
		>
			<Heading fontSize={"3xl"} mb={2} textAlign={'center'}>PMS Inventory</Heading>
			<form id="frmLogin" onSubmit={handleSubmit}>
				<Stack spacing={4}>
					<FormControl id="username" isInvalid={false}>
						<FormLabel>Username</FormLabel>
						<Input type="text" name="username"/>
					</FormControl>
					<FormControl id="password" isInvalid={false}>
						<FormLabel>Password</FormLabel>
						<Input type="password" name="password"/>
					</FormControl>
					<Stack spacing={10}>
						<Button
							type="submit"
							bg={"blue.400"}
							color={"white"}
							isLoading={loading} 
							spinnerPlacement='end'
							_hover={{
								bg: "blue.500",
							}}
						>
							Sign in
						</Button>
					</Stack>
				</Stack>
			</form>
			
		</Box>
  )
}

export default Login