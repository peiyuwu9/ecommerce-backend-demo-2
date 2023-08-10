export const routes = {
  root: {
    name: "root",
    pathname: "/",
  },
  overview: {
    name: "Overview",
    pathname: "/dashboard",
    label: "dashboard-nav",
  },
  products: {
    name: "Products",
    pathname: "/dashboard/products",
    label: "dashboard-nav",
  },
  newProduct: {
    name: "New Product",
    pathname: "/dashboard/products/new",
  },
  categories: {
    name: "Categories",
    pathname: "/dashboard/categories",
    label: "dashboard-nav",
  },
  newCategory: {
    name: "New Category",
    pathname: "/dashboard/categories/new",
  },
  analytics: {
    name: "Analytics",
    pathname: "/dashboard/analytics",
    label: "dashboard-nav",
  },
  settings: {
    name: "Settings",
    pathname: "/dashboard/settings",
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
