const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "20px" }}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Description: {product.description}</p>
          <p>Inventory Amount: {product.inventoryAmount}</p>
          {product.image && <img src={product.image} alt={product.name} />}
        </div>
      ))}
    </div>
  );
};

export default Products;
