const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 199, rating: 4.5 },
  { id: 2, name: 'Organic Green Tea', category: 'Groceries', price: 15, rating: 4.8 },
  { id: 3, name: 'Smart Watch', category: 'Electronics', price: 299, rating: 4.2 },
  { id: 4, name: 'Yoga Mat', category: 'Fitness', price: 45, rating: 4.7 },
  { id: 5, name: 'Running Shoes', category: 'Fitness', price: 85, rating: 4.3 },
  { id: 6, name: 'LED Desk Lamp', category: 'Home Decor', price: 50, rating: 4.6 },
  { id: 7, name: 'Bluetooth Speaker', category: 'Electronics', price: 120, rating: 4.4 },
  { id: 8, name: 'Cookware Set', category: 'Home Decor', price: 180, rating: 4.1 },
  { id: 9, name: 'Protein Powder', category: 'Fitness', price: 55, rating: 4.9 },
  { id: 10, name: 'Almonds Pack', category: 'Groceries', price: 22, rating: 4.5 },
];

const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sortOptions = document.getElementById('sortOptions');
const productList = document.getElementById('productList');

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}


function renderProducts(items) {
  productList.innerHTML = '';
  if (items.length === 0) {
    productList.innerHTML = '<p>No products match the criteria.</p>';
    return;
  }
  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-name">${product.name}</div>
      <div class="product-category">${product.category}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">⭐ ${product.rating}</div>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }


  const maxPrice = +priceFilter.value;
  filtered = filtered.filter(p => p.price <= maxPrice);

  const sortValue = sortOptions.value;
  if (sortValue === 'price-asc') {
    filtered.sort((a,b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    filtered.sort((a,b) => b.price - a.price);
  } else if (sortValue === 'rating-desc') {
    filtered.sort((a,b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}


categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('input', () => {
  priceValue.textContent = `$${priceFilter.value}`;
  applyFilters();
});
sortOptions.addEventListener('change', applyFilters);


populateCategories();
applyFilters();
