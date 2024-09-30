/** @format */

export function formatCurrency(amount: number) {
  let formatedAmount = '';
  while (amount > 999) {
    const temp = amount % 1000; // 10^3 => log(10^3)n
    const tempFormat =
      temp === 0
        ? ',000'
        : temp < 10
        ? `,00${temp}`
        : temp < 100
        ? `,0${temp}`
        : `,${temp}`;
    formatedAmount = tempFormat + formatedAmount;
    amount = Math.floor(amount / 1000);
  }
  if (amount > 0) {
    formatedAmount = amount + formatedAmount;
  }
  return amount === 0 ? '0' : formatedAmount;
}

const regionalCode: Record<string, string> = {
  '+84': 'VN',
  '+65': 'SG',
  '+1': 'US',
  '+353': 'Ireland',
};

export function formatPhoneNumber(phone: string) {
  let currentRegionalCode = '';
  let i = 2;
  // slice regional code
  while (i <= 4) {
    currentRegionalCode = phone.substring(0, i);
    if (regionalCode[currentRegionalCode]) {
      break;
    }
    i++;
  }
  const phoneNumber = phone.substring(i);
  if (phoneNumber.length === 8) {
    return `(${currentRegionalCode}) ${phoneNumber.substring(
      0,
      4
    )} ${phoneNumber.substring(4)}`;
  }
  const head = `(${currentRegionalCode}) ${phoneNumber.substring(0, 3)}`;

  if (phoneNumber.length < 6) {
    return `${head} ${phoneNumber.substring(3, 6)}`;
  }
  return `${head} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
}


export function getTodo(currentTasks: Array<{id: number, value:string}>, index?: number) {
  if(!index || index < 0) {
		return null
	}

	return currentTasks[index]
}