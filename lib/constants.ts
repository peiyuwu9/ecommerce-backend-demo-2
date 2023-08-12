export const routes = {
  signin: {
    name: "Signin",
    pathname: "/sing-in",
  },
  signup: {
    name: "Signup",
    pathname: "/sing-up",
  },
  overview: {
    name: "Overview",
    pathname: "/",
    label: "dashboard-nav",
  },
  products: {
    name: "Products",
    pathname: "/products",
    label: "dashboard-nav",
  },
  newProduct: {
    name: "New Product",
    pathname: "/products/new",
  },
  categories: {
    name: "Categories",
    pathname: "/categories",
    label: "dashboard-nav",
  },
  newCategory: {
    name: "New Category",
    pathname: "/categories/new",
  },
  orders: {
    name: "Orders",
    pathname: "/orders",
    label: "dashboard-nav",
  },
  analytics: {
    name: "Analytics",
    pathname: "/analytics",
    label: "dashboard-nav",
  },
};

export const productFormErrorMsg = {
  name: "Please enter product name",
  images: "Please upload at least one image",
  category: "Please select one category",
  netWeight: "Please enter net weight",
  price: "Please set a price",
  quantity: "Please enter quantities",
};

export const categoryFormErrorMsg = {
  name: "Please enter product name",
};

export const MAX_IMAGE_UPLOAD = 3;
