class HelperService {
	padTo2Digits = (num: number) => {
		return num.toString().padStart(2, "0");
	};
	
	formatDate = (date: Date) => {
		return (
		  [
				date.getFullYear(),
				this.padTo2Digits(date.getMonth() + 1),
				this.padTo2Digits(date.getDate()),
		  ].join("-") +
		  " " +
		  [
				this.padTo2Digits(date.getHours()),
				this.padTo2Digits(date.getMinutes()),
				this.padTo2Digits(date.getSeconds()),
		  ].join(":")
		);
	};

	selectInputID = (inputID: string) => {
		return document.querySelector("#"+inputID) as HTMLInputElement;
	};

	selectElementID = (elementID: string) => {
		return document.querySelector("#"+elementID) as HTMLElement;
	};

	selectAllElement = (elementClass: string) => {
		return document.querySelectorAll("."+elementClass) as NodeListOf<HTMLElement>;
	};
}

export default HelperService