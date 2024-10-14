export const validateForm = function (email?: string, password?: string) {
	const errors = {
		email: '',
		password: ''
	}

	if (!email) {
		errors.email = 'Email is required'
	}
	if (!password) {
		errors.password = 'Password is required'
		return errors
	}

	if (password.length < 8) {
		errors.password = 'Password is at least 8 letters'
	}

	return errors
}

interface Product {
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}
export const validateProductForm = (formData: Product): string | null => {
  if (!formData.name.trim()) {
    return "Product name is required";
  }
  if (formData.available < 0) {
    return "Available quantity cannot be negative";
  }
  if (formData.price <= 0) {
    return "Price must be greater than zero";
  }
  if (formData.categoryId === 0) {
    return "Please select a category";
  }
  if (formData.colorIds.length === 0) {
    return "Please select at least one color";
  }
  return null; 
};
export const validateString = function (label: string, length: number) {
  return function (str: string) {
    if (!str.trim()) {
      return `${label} name is required`;
    }
    if (str.length > length) {
      return `${label} name must be less than ${length} characters`;
    }
  };
};